import { Container, Row, Col, Navbar, Nav } from "react-bootstrap";
import Footer from "./layout/Footer";
import { useC2pa, useThumbnailUrl } from '@contentauth/react';
import {useState, useEffect, useRef} from 'react'
import {
    C2paReadResult,
    generateVerifyUrl,
    Manifest,
    selectProducer,
    L2ManifestStore,
    createL2ManifestStore,
  } from 'c2pa';

import NewsCard from "./common-components/NewsCard";
import newsItems from "../newsItems";
import Header from "./layout/header";


function WebComponents({
    imageUrl,
    provenance,
    viewMoreUrl,
  }) {
    const [manifestStore, setManifestStore] = useState(
      null,
    );
    const summaryRef = useRef();
  
    useEffect(() => {
      let disposeFn = () => {};
  
      if (!provenance.manifestStore?.activeManifest) {
        return;
      }
  
      createL2ManifestStore(provenance.manifestStore).then(
        ({ manifestStore, dispose }) => {
          setManifestStore(manifestStore);
          disposeFn = dispose;
        },
      );
  
      return disposeFn;
    }, [provenance.manifestStore?.activeManifest]);
  
    useEffect(() => {
      const summaryElement = summaryRef.current;
      if (summaryElement && manifestStore) {
        summaryElement.manifestStore = manifestStore;
        summaryElement.viewMoreUrl = viewMoreUrl;
      }
    }, [summaryRef, manifestStore]);
  
    return (
      <div className="web-components">
        <div className="wrapper">
          <img src={imageUrl} />
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
    );
  }

const Dashboard = () => {
    const sampleImage ="https://picsum.photos/id/0/5000/3333"
//   'https://raw.githubusercontent.com/contentauth/c2pa-js/main/tools/testing/fixtures/images/CAICAI.jpg';

    const provenance = useC2pa(sampleImage);
    console.log('provenance', provenance);
      const viewMoreUrl = generateVerifyUrl(sampleImage);
  return (
    <div className="App">
      <Header />
      <Container fluid style={{marginBottom: "100px"}}>
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
            
            {provenance?.manifestStore ? <WebComponents
            imageUrl={sampleImage}
            provenance={provenance}
            viewMoreUrl={viewMoreUrl}
          /> : null}
              {/* Loop through news items and render cards */}
              {newsItems.map((item) => (
                <NewsCard key={item.imageSrc} imageSrc={item.imageSrc} />
              ))}
            </Row>
          </Col>
          {/* Rest of your layout code remains the same */}
        </Row>
      </Container>
      <Footer />
    </div>
  );
};
export default Dashboard;
