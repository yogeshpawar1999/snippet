import { Container, Row, Col, Navbar, Nav, Image } from "react-bootstrap"
import Footer from "./layout/Footer"
import { useC2pa, useThumbnailUrl } from "@contentauth/react"
import { useState, useEffect, useRef } from "react"
import {
  C2paReadResult,
  generateVerifyUrl,
  Manifest,
  selectProducer,
  L2ManifestStore,
  createL2ManifestStore,
} from "c2pa"

import NewsCard from "./common-components/NewsCard"
import newsItems from "../newsItems"
import Header from "./layout/header"

function WebComponents({ imageUrl, provenance, viewMoreUrl }) {
  console.log("Inside WebComponents")

  const [manifestStore, setManifestStore] = useState(null)
  const summaryRef = useRef()

  useEffect(() => {
    let disposeFn = () => {}

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
  console.log(
    "provenance?.manifestStore",
    sampleImage,
    provenance?.manifestStore
  )

  return (
    <>
      {provenance?.manifestStore ? (
        <Col>
          <WebComponents
            imageUrl={sampleImage}
            provenance={provenance}
            viewMoreUrl={viewMoreUrl}
          />
        </Col>
      ) : null}
    </>
  )
}

const Dashboard = () => {
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
        const Dataele = data.data.map((ele) => {
          return `http://localhost:1337${ele.attributes.ContentImages.data[0].attributes.url}`
        })
        // setNewsList(()=> Dataele)
        setNewsList((prevele) => [
          ...prevele,
          sampleImage,
          sampleImage,
          sampleImage,
          sampleImage,
        ])
        console.log("Dataele", Dataele)
        console.log("newsList", newsList)

        // console.log("data", data.data.attributes)
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
                <h2>Latest News</h2>
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
                newsList?.map((item) => <MidComp sampleImage={sampleImage} />)}
              {/* {provenance[0]?.manifestStore ? (
                newsItems.map((item, index) => (
                  // {provenance[0]?.manifestStore ? (
                  <WebComponents
                    imageUrl={sampleImage}
                    provenance={provenance[0]}
                    viewMoreUrl={viewMoreUrl}
                  />
                  // ) : null}
                ))
              ) : null} */}
              {/* Loop through news items and render cards */}
              {/* {newsItems.map((item) => (
                <NewsCard key={item.id} imageSrc={item.imageSrc} />
              ))} */}
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
