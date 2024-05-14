import { Container, Row, Col, Navbar, Nav, Image, Card } from "react-bootstrap"
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
  console.log("Inside WebComponents")

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
        {/* <img src={imageUrl} /> */}
        {console.log("imageUrl", imageUrl)}
        <Image
          src={imageUrl}
          alt="Snippet News Logo"
          width="100%"
          height="100%"
          className="me-3"
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

const MidComp = ({ sampleImage }) => {
  const provenance = useC2pa(sampleImage)
  console.log("provenance h", provenance)
  const viewMoreUrl = generateVerifyUrl(sampleImage)
  console.log("viewMoreUrl", viewMoreUrl)

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
          ) : <Image
            src={sampleImage}
            alt="Snippet News Logo"
            width="100%"
            height="100%"
            className="me-3"
          />}
        </Card>
      </Col>

    </>
  )
}

const Dashboard = () => {


  const user = useContext(AuthContext);

  console.log('123 user *****', user);

  // const sampleImage ="https://picsum.photos/id/0/5000/3333"

  const sampleImage =
    "https://raw.githubusercontent.com/contentauth/c2pa-js/main/tools/testing/fixtures/images/CAICAI.jpg"
  //   'https://raw.githubusercontent.com/contentauth/c2pa-js/main/tools/testing/fixtures/images/CAICAI.jpg';
  // const provenance = [];
  // provenance[0] = useC2pa(sampleImage)
  // provenance[1] = useC2pa(sampleImage)

  // console.log("provenance", provenance)
  // const viewMoreUrl = generateVerifyUrl(sampleImage)
  // console.log("viewMoreUrl", viewMoreUrl)
  const [newsList, setNewsList] = useState([])
  const API_KEY =
    "37ca773f6ef96b659beba80ce93739e02202b60c66544be1025b4bce433abef76196ab25b9087bc4e0c0ae87e710877417ffeba39a5beed9af7d3a46c54eca43fca5ef878861b45747f477d9961c0bf89b9a8f5d80e17170c3d6de8e935f4c9bdfda1cd19e5995c2272fda41ab6a95e2701451b4bca47596319fc7855558a918"
  const getContentAPI = async () => {
    fetch("http://localhost:1337/api/create-contents?populate=*", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {

        let mappedData = [];
        console.log('user?.userData?.role', user?.userData?.role);
        
        switch (user?.userData?.role) {
          case ROLES.AUTHOR:
            mappedData = data.data.filter(ele => { return ele.attributes?.AuthorName === user?.userData?.name }).map((curEle) => `http://localhost:1337${curEle.attributes.ContentImages.data[0].attributes.url}`)
            break;
          case ROLES.EDITOR:
            mappedData = data.data.filter(ele => { return ele.attributes?.Status === NewsStatus.IN_REVIEW }).map((curEle) => `http://localhost:1337${curEle.attributes.ContentImages.data[0].attributes.url}`)
            break;
          default:
            mappedData = data.data.filter(ele => { return ele.attributes?.Status === NewsStatus.PUBLISHED }).map((curEle) => `http://localhost:1337${curEle.attributes.ContentImages.data[0].attributes.url}`)
            break;
        }

        setNewsList(() => mappedData)
      })
      .catch((error) => console.error("Error:", error))
  }

  useEffect(() => {
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
                <p>{console.log("ABC", user)}</p>
                <h2>{user?.userData?.role === ROLES.AUTHOR ? 'My Posts' : user?.userData?.role === ROLES.EDITOR ? 'New Requests' : "Latest News"}</h2>
              </div>
            </div>
            <hr />
            {/* News section */}
            <Row xs={4} md={3} lg={4} className="g-4">
              {console.log(
                "newsList",
                newsList,
                Array.isArray(newsList),
                newsList.length
              )}

              {newsList?.length &&
                newsList?.map((item) => <MidComp sampleImage={item} />)}
              
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
