import { Container, Row, Col, Navbar, Nav, Image, Card, Button } from "react-bootstrap"
import Footer from "./layout/Footer"
import { useC2pa, useThumbnailUrl } from "@contentauth/react"
import { useState, useEffect, useRef, useContext } from "react"
import {
  C2paReadResult,
  generateVerifyUrl,
  Manifest,
  selectProducer,
  L2ManifestStore,
  createL2ManifestStore,
} from "c2pa"

import { AuthContext } from "./AuthContext"
import NewsCard from "./common-components/NewsCard"
import newsItems from "../newsItems"
import Header from "./layout/header"
import { ManifestSummary } from "c2pa-wc/dist/components/ManifestSummary"
import "c2pa-wc/dist/components/Icon"
import "c2pa-wc/dist/components/Indicator"
import "c2pa-wc/dist/components/ManifestSummary"
import "c2pa-wc/dist/components/PanelSection"
import "c2pa-wc/dist/components/Popover"
import "./Dashboard.css"
import { AUTHORS, NewsStatus, ROLES } from "../common/constants"
import { Buffer } from 'buffer';
interface WebComponentsProps {
  imageUrl: string
  provenance: C2paReadResult
  viewMoreUrl: string
}

function WebComponents({
  imageUrl,
  provenance,
  viewMoreUrl,
}: WebComponentsProps) {
  const [manifestStore, setManifestStore] = useState<L2ManifestStore | null>(
    null
  )
  const summaryRef = useRef<ManifestSummary>()

  useEffect(() => {
    let disposeFn = () => { }

    if (!provenance.manifestStore?.activeManifest) {
      return
    }

    createL2ManifestStore(provenance.manifestStore).then(
      ({ manifestStore, dispose }) => {
        setManifestStore(manifestStore)
        disposeFn = dispose
      }
    )

    return disposeFn
  }, [provenance.manifestStore?.activeManifest])

  useEffect(() => {
    const summaryElement = summaryRef.current
    if (summaryElement && manifestStore) {
      summaryElement.manifestStore = manifestStore
      summaryElement.viewMoreUrl = viewMoreUrl
    }
  }, [summaryRef, manifestStore])

  return (
    <div className="web-components">
      <div className="wrapper">
        <Image
          src={imageUrl}
          alt="Snippet News Logo"
          width="100%"
          height="100%"
          className="card-image-te"
          style={{ megingLeft: '10px' }}
        />
        {manifestStore ? (
          <div>
            <cai-popover interactive class="theme-spectrum">
              <cai-indicator slot="trigger"></cai-indicator>
              <cai-manifest-summary
                ref={summaryRef}
                slot="content"
                class="theme-spectrum"
              ></cai-manifest-summary>
            </cai-popover>
          </div>
        ) : null}
      </div>
    </div>
  )
}

const MidComp = ({ sampleImage, attributes, userInfo }) => {
  const provenance = useC2pa(sampleImage)
  const viewMoreUrl = generateVerifyUrl(sampleImage)

  const updateContent = async (newFile) => {
    const formData = new FormData()
    // formData.append("id", attributes.id)
    formData.append("contentImage", newFile)
    formData.append("status", NewsStatus.PUBLISHED)

    console.log('newFile', newFile);

    const response = await fetch(`http://192.168.1.27:5001/content/${attributes.id}`, {
      method: "PATCH",
      body: formData,
    })

    console.log('response:::::', response);

  }

  const signedImgae = async (sampleImage) => {
    const toDataURL = (sampleImage) =>
      fetch(sampleImage)
        .then((response) => response.blob())
        .then(
          (blob) =>
            new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.onloadend = () => resolve(reader.result);
              reader.onerror = reject;
              reader.readAsDataURL(blob);
            })
        );

    toDataURL(sampleImage).then(async (dataUrl) => {
      console.log("RESULT:", dataUrl);
      try {
        const requestBody = {
          file: dataUrl,
          title: attributes?.title,
          authorName: attributes?.authorName,
          authorSocial: attributes?.socialLink,
          publishedBy: "SNIPPET NEWS",
          editor: '',
          authorEmail: attributes?.authorEmail
        };
        const headers = {
          "Content-Type": "application/json",
          Accept: "application/json",
        };
        const response = await fetch("http://192.168.1.128:3000/content/sign", {
          method: "POST",
          headers: headers,
          body: JSON.stringify(requestBody),
        });
        if (!response.ok) {
          throw new Error("Failed to upload data");
        }
        console.log('dataRawURL json1', response);

        const dataRawURL = await response.json()
        console.log('dataRawURL json', dataRawURL);
        const convertBase64ToFile = function (image) {
          const byteString = atob(image.split(',')[1]);
          const ab = new ArrayBuffer(byteString.length);
          const ia = new Uint8Array(ab);
          for (let i = 0; i < byteString.length; i += 1) {
            ia[i] = byteString.charCodeAt(i);
          }
          const newBlob = new Blob([ab], {
            type: 'image/jpeg',
          });
          return newBlob;
        };

        // const yourFile = await dataURLtoFile(dataRawURL, "yourImageName")
        // const i = dataRawURL.base64.indexOf('base64,');
        // const buffer = Buffer.from(dataRawURL.base64.slice(i + 7), 'base64');
        const img = convertBase64ToFile(dataRawURL.base64)
        const newFile = new File([img], "filename.png", { type: "image/png" })


        updateContent(newFile)
        console.log('yourFile', newFile);


        // console.log("Response:", await response.json());
      } catch (error) {
        console.error("Error saving image:", error);
      }
    });
  };

  return (
    <>
      <Col>
        <Card>
          {provenance?.manifestStore ? (
            <WebComponents
              imageUrl={sampleImage}
              provenance={provenance}
              viewMoreUrl={viewMoreUrl}
            />
          ) : (
            <Image
              src={sampleImage}
              alt="Snippet News Logo"
              width="100%"
              height="100%"
              className="me-3"
            />
          )}
          {userInfo?.role === ROLES.EDITOR &&
            <div className="d-flex justify-content-around">
              <Button variant="danger" className='m-2 disabled'>Reject</Button>
              <Button variant="primary" className='m-2' onClick={() => signedImgae(sampleImage)}>Approve</Button>
            </div>
          }

          {/* {userData?.role === ROLES.EDITOR &&
          <div>
            <button>Approve</button>
          </div> } */}
        </Card>
      </Col>
    </>
  )
}

const Dashboard = () => {
  const user = useContext(AuthContext)

  // const sampleImage =
  //   "https://raw.githubusercontent.com/contentauth/c2pa-js/main/tools/testing/fixtures/images/CAICAI.jpg"
  const [newsList, setNewsList] = useState([])

  useEffect(() => {
    const getContentAPI = async () => {
      fetch("http://192.168.1.27:5001/content", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          let mappedData = []

          switch (user?.userData?.role) {
            case ROLES.AUTHOR:
              mappedData = data.data
                .filter((ele) => ele.authorName === user?.userData?.name)
                .map((curEle) => ({ contentImage: curEle.contentImage, attributes: curEle }))
              break
            case ROLES.EDITOR:
              mappedData = data.data
                .filter((ele) => ele?.status === NewsStatus.IN_REVIEW)
                .map((curEle) => ({ contentImage: curEle.contentImage, attributes: curEle }))
              break
            default:
              mappedData = data.data
                // .filter((ele) => ele?.status === NewsStatus.PUBLISHED)
                .map((curEle) => ({ contentImage: curEle.contentImage, attributes: curEle }))
              break
          }
          setNewsList(() => mappedData)
        })
        .catch((error) => console.error("Error:", error))
    }

    getContentAPI()
  }, [])
  return (
    <div className="App">
      <Header />
      <Container fluid style={{ marginBottom: "100px" }}>
        <Row>
          <Col xs={12} lg={12}>
            <div className="d-flex flex-wrap justify-content-between">
              <div className="mb-2">
                <h2>
                  {user?.userData?.role === ROLES.AUTHOR && "My Posts"}
                  {user?.userData?.role === ROLES.EDITOR && "New Requests"}
                  {!user?.userData?.role && "Latest News"}
                </h2>
              </div>
            </div>
            <hr />
            {/* News section */}
            <Row xs={4} md={3} lg={4} className="g-4">
              {newsList?.length &&
                newsList?.map((item) => <MidComp sampleImage={item.contentImage} attributes={item.attributes} userInfo ={user?.userData}/>)}
            </Row>
          </Col>
          {/* Rest of your layout code remains the same */}
        </Row>
      </Container>
      <Footer />
    </div>
  )
}
export default Dashboard
