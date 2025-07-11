'use client';

import { useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getData, getSvg } from './API';
import Link from 'next/link';


export default function Home() {
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  const [svgColor, setSvgColor] = useState('#f97316');
  const [svgList, setSvgList] = useState([]);
  const [selectedSVG, setSelectedSVG] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(svgList.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleSVGs = svgList.slice(startIndex, endIndex);

  const svgRef = useRef(null);


  // const svgList = [
  //   {
  //     id: 1,
  //     svg: (
  //       <svg width="64" height="64" viewBox="0 0 131 141" fill="none" xmlns="http://www.w3.org/2000/svg">
  //         <path d="M3 30.316C3 24.1149 8.02698 19.0879 14.2281 19.0879H89.4562C95.6572 19.0879 100.684 24.1149 100.684 30.316V126.877C100.684 133.078 95.6572 138.105 89.4561 138.105H14.2281C8.02697 138.105 3 133.078 3 126.877V30.316Z" fill={svgColor} />
  //         <path d="M31.0701 11.2281C31.0701 5.02698 36.0971 0 42.2982 0H119.772C125.973 0 131 5.02698 131 11.2281V99.9298C131 106.131 125.973 111.158 119.772 111.158H42.2982C36.0971 111.158 31.0701 106.131 31.0701 99.9298V11.2281Z" fill="#ECEFF1" />
  //         <path d="M119.772 104.421V111.158H42.2986V104.421H119.772ZM124.263 99.9297V11.2285C124.263 8.7482 122.253 6.73751 119.772 6.7373H42.2986C39.8182 6.7373 37.8074 8.74808 37.8074 11.2285V99.9297C37.8074 102.41 39.8182 104.421 42.2986 104.421V111.158L41.7205 111.144C35.9793 110.853 31.3759 106.249 31.0848 100.508L31.0701 99.9297V11.2285C31.0701 5.22117 35.7879 0.315315 41.7205 0.0146484L42.2986 0H119.772L120.349 0.0146484C126.282 0.31524 131 5.22112 131 11.2285V99.9297L130.985 100.508C130.694 106.249 126.091 110.853 120.349 111.144L119.772 111.158V104.421C122.253 104.421 124.263 102.41 124.263 99.9297Z" fill="black" />
  //         <path d="M107.421 40.4209L107.594 40.4248C109.374 40.515 110.79 41.9869 110.79 43.7891C110.79 45.5912 109.374 47.0631 107.594 47.1533L107.421 47.1572H54.6491C52.7888 47.1572 51.2809 45.6494 51.2809 43.7891C51.2809 41.9287 52.7888 40.4209 54.6491 40.4209H107.421Z" fill="black" />
  //         <path d="M107.421 58.3867L107.594 58.3906C109.374 58.4809 110.79 59.9527 110.79 61.7549C110.79 63.5571 109.374 65.0289 107.594 65.1191L107.421 65.123H54.6491C52.7888 65.123 51.2809 63.6152 51.2809 61.7549C51.2809 59.8946 52.7888 58.3867 54.6491 58.3867H107.421Z" fill="black" />
  //         <path d="M107.421 76.3516L107.594 76.3555C109.374 76.4457 110.79 77.9175 110.79 79.7197C110.79 81.5219 109.374 82.9938 107.594 83.084L107.421 83.0879H54.6491C52.7888 83.0879 51.2809 81.5801 51.2809 79.7197C51.2809 77.8594 52.7888 76.3516 54.6491 76.3516H107.421Z" fill="black" />
  //         <path d="M0.194208 33.6848C0.194208 29.8372 1.17124 26.6157 2.91393 24.0158C4.6437 21.4353 6.99784 19.6592 9.46765 18.468C14.0097 16.2774 19.2195 15.9213 22.8827 16.2316L23.5946 16.3029L23.7665 16.3264C25.5242 16.6182 26.7629 18.2411 26.5585 20.0314C26.3538 21.8221 24.7805 23.1236 23.0018 23.0109L22.829 22.9963L22.2753 22.9416C19.4323 22.7052 15.5276 23.0252 12.3944 24.5363C10.7709 25.3194 9.44058 26.378 8.50964 27.7668C7.59155 29.1365 6.93151 31.0201 6.93151 33.6848V124.704L6.92761 124.778C6.85848 126.367 7.27955 128.81 8.65612 130.755C9.90103 132.514 12.13 134.175 16.4755 134.175H86.6493C89.435 134.175 91.7351 133.675 93.3944 132.114C95.0356 130.571 96.7548 127.313 96.7548 120.14C96.7549 118.28 98.2627 116.772 100.123 116.772C101.983 116.772 103.491 118.28 103.491 120.14C103.491 128.236 101.561 133.681 98.0096 137.022C94.4761 140.345 90.0389 140.912 86.6493 140.912H16.4755C10.042 140.912 5.72038 138.269 3.1571 134.648C0.761416 131.263 0.100292 127.317 0.194208 124.606V33.6848Z" fill="black" />
  //       </svg>
  //     ),
  //   },
  //   {
  //     id: 2,
  //     svg: (
  //       <svg width="64" height="64" viewBox="0 0 131 141" fill="none" xmlns="http://www.w3.org/2000/svg">
  //         <path d="M3 30.316C3 24.1149 8.02698 19.0879 14.2281 19.0879H89.4562C95.6572 19.0879 100.684 24.1149 100.684 30.316V126.877C100.684 133.078 95.6572 138.105 89.4561 138.105H14.2281C8.02697 138.105 3 133.078 3 126.877V30.316Z" fill={svgColor} />
  //         <path d="M31.0701 11.2281C31.0701 5.02698 36.0971 0 42.2982 0H119.772C125.973 0 131 5.02698 131 11.2281V99.9298C131 106.131 125.973 111.158 119.772 111.158H42.2982C36.0971 111.158 31.0701 106.131 31.0701 99.9298V11.2281Z" fill="#ECEFF1" />
  //         <path d="M119.772 104.421V111.158H42.2986V104.421H119.772ZM124.263 99.9297V11.2285C124.263 8.7482 122.253 6.73751 119.772 6.7373H42.2986C39.8182 6.7373 37.8074 8.74808 37.8074 11.2285V99.9297C37.8074 102.41 39.8182 104.421 42.2986 104.421V111.158L41.7205 111.144C35.9793 110.853 31.3759 106.249 31.0848 100.508L31.0701 99.9297V11.2285C31.0701 5.22117 35.7879 0.315315 41.7205 0.0146484L42.2986 0H119.772L120.349 0.0146484C126.282 0.31524 131 5.22112 131 11.2285V99.9297L130.985 100.508C130.694 106.249 126.091 110.853 120.349 111.144L119.772 111.158V104.421C122.253 104.421 124.263 102.41 124.263 99.9297Z" fill="black" />
  //         <path d="M107.421 40.4209L107.594 40.4248C109.374 40.515 110.79 41.9869 110.79 43.7891C110.79 45.5912 109.374 47.0631 107.594 47.1533L107.421 47.1572H54.6491C52.7888 47.1572 51.2809 45.6494 51.2809 43.7891C51.2809 41.9287 52.7888 40.4209 54.6491 40.4209H107.421Z" fill="black" />
  //         <path d="M107.421 58.3867L107.594 58.3906C109.374 58.4809 110.79 59.9527 110.79 61.7549C110.79 63.5571 109.374 65.0289 107.594 65.1191L107.421 65.123H54.6491C52.7888 65.123 51.2809 63.6152 51.2809 61.7549C51.2809 59.8946 52.7888 58.3867 54.6491 58.3867H107.421Z" fill="black" />
  //         <path d="M107.421 76.3516L107.594 76.3555C109.374 76.4457 110.79 77.9175 110.79 79.7197C110.79 81.5219 109.374 82.9938 107.594 83.084L107.421 83.0879H54.6491C52.7888 83.0879 51.2809 81.5801 51.2809 79.7197C51.2809 77.8594 52.7888 76.3516 54.6491 76.3516H107.421Z" fill="black" />
  //         <path d="M0.194208 33.6848C0.194208 29.8372 1.17124 26.6157 2.91393 24.0158C4.6437 21.4353 6.99784 19.6592 9.46765 18.468C14.0097 16.2774 19.2195 15.9213 22.8827 16.2316L23.5946 16.3029L23.7665 16.3264C25.5242 16.6182 26.7629 18.2411 26.5585 20.0314C26.3538 21.8221 24.7805 23.1236 23.0018 23.0109L22.829 22.9963L22.2753 22.9416C19.4323 22.7052 15.5276 23.0252 12.3944 24.5363C10.7709 25.3194 9.44058 26.378 8.50964 27.7668C7.59155 29.1365 6.93151 31.0201 6.93151 33.6848V124.704L6.92761 124.778C6.85848 126.367 7.27955 128.81 8.65612 130.755C9.90103 132.514 12.13 134.175 16.4755 134.175H86.6493C89.435 134.175 91.7351 133.675 93.3944 132.114C95.0356 130.571 96.7548 127.313 96.7548 120.14C96.7549 118.28 98.2627 116.772 100.123 116.772C101.983 116.772 103.491 118.28 103.491 120.14C103.491 128.236 101.561 133.681 98.0096 137.022C94.4761 140.345 90.0389 140.912 86.6493 140.912H16.4755C10.042 140.912 5.72038 138.269 3.1571 134.648C0.761416 131.263 0.100292 127.317 0.194208 124.606V33.6848Z" fill="black" />
  //       </svg>
  //     ),
  //   },
  //   {
  //     id: 3,
  //     svg: (
  //       <svg width="64" height="64" viewBox="0 0 134 178" fill="none" xmlns="http://www.w3.org/2000/svg">
  //         <path d="M0.508789 173.421V5H9.49121V173.421C9.49121 175.901 7.48044 177.912 5 177.912C2.51956 177.912 0.508789 175.901 0.508789 173.421Z" fill="black" />
  //         <path d="M126.598 5H7.24561C6.0054 5 5 6.0054 5 7.24562V88.0877C5 89.3279 6.00539 90.3333 7.24561 90.3333H126.038C128.218 90.3333 129.119 87.5393 127.35 86.2653L79.26 51.6405C78.054 50.7722 78.0088 48.9929 79.1693 48.0646L128.001 8.99914C129.659 7.67309 128.721 5 126.598 5Z" fill={svgColor} />
  //         <path d="M126.599 0.508789C132.867 0.509111 135.69 8.27899 131.034 12.3164L130.807 12.5059L84.2832 49.7236L129.975 82.6201L130.217 82.8027C135.197 86.7019 132.477 94.824 126.038 94.8242H7.24609C3.5255 94.8242 0.50888 91.8085 0.508789 88.0879V7.24609C0.508789 3.52544 3.52543 0.508789 7.24609 0.508789H126.599ZM9.49121 85.8418H119.075L76.6357 55.2852C73.0178 52.6802 72.8822 47.3427 76.3633 44.5576L120.196 9.49121H9.49121V85.8418Z" fill="black" />
  //       </svg>


  //     ),
  //   },
  // ];



  const fetchSvgList = async () => {
    try {
      const res = await getData();
      const categories = res.data.categories;
      const allIcons = Object.values(categories).flat();
      const limitedIcons = allIcons.slice(0, 50);

      const svgPromises = limitedIcons.map(async (iconName) => {
        const res = await getSvg(iconName);
        return { name: iconName, rawSvg: res.data }; // Save raw SVG
      });

      const icons = await Promise.all(svgPromises);
      setSvgList(icons);
    } catch (error) {
      console.error('Error fetching SVG icons:', error);
    }
  };

  useEffect(() => {
    fetchSvgList();
  }, []);




  const applyColorToSvg = (svg, color, pathIndex = 0) => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(svg, 'image/svg+xml');
    const paths = xmlDoc.getElementsByTagName('path');

    if (paths.length > pathIndex) {
      paths[pathIndex].setAttribute('fill', color);
    }

    const serializer = new XMLSerializer();
    return serializer.serializeToString(xmlDoc);
  };


  const downloadSVG = () => {
    if (!svgRef.current) return;
    const svgElement = svgRef.current.querySelector('svg');
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'downloaded-image.svg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const downloadPNG = () => {
    if (!svgRef.current) return;

    const svgElement = svgRef.current.querySelector('svg');

    if (!svgElement) return;

    const svgData = new XMLSerializer().serializeToString(svgElement);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    const img = new Image();

    // Get exact size from viewBox
    const viewBox = svgElement.getAttribute('viewBox');
    let width = 300;
    let height = 300;

    if (viewBox) {
      const [, , w, h] = viewBox.split(' ').map(Number);
      width = w;
      height = h;
    } else {
      width = svgElement.width.baseVal.value || 300;
      height = svgElement.height.baseVal.value || 300;
    }

    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);

      const pngUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = pngUrl;
      link.download = 'downloaded-image.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(url);
    };

    img.src = url;
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };


  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container ">
          <Link href="/" className="navbar-brand">unDraw</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex justify-content-end align-items-center gap-2 ms-auto w-100">

              <li>Search</li>
              <li className="nav-item">
                <input
                  type="color"
                  id="colorPicker"
                  className="form-control form-control-color"
                  value={svgColor}
                  onChange={(e) => setSvgColor(e.target.value)}
                  title="Choose your color"
                />
              </li>
            </ul>

          </div>
        </div>
      </nav>
      <main>
        <div className="container">

          <div className="row justify-content-center align-items-center gap-4">
            {visibleSVGs.map((item, index) => (
              <div
                className="col-lg-2 col-md-3 col-sm-4 col-6 mb-4"
                key={index}
              >
                <div
                  className="svg-card text-center"
                  data-bs-toggle="modal"
                  href="#exampleModalToggle"
                  role="button"
                  onClick={() =>
                    setSelectedSVG(applyColorToSvg(item.rawSvg, svgColor))
                  }
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: applyColorToSvg(item.rawSvg, svgColor),
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* pagination  */}
        <div className='pagination d-flex justify-content-center align-items-center my-4'>
          <button className='btn page-btn' onClick={handlePreviousPage}>Previous</button>
          <p>page {currentPage} of {totalPages}</p>
          <button className='btn page-btn' onClick={handleNextPage}>Next</button>
        </div>
      </main>

      {/* modal */}
      <div className="modal fade" id="exampleModalToggle" aria-hidden="true" aria-labelledby="exampleModalToggleLabel" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="d-flex flex-column align-items-center justify-content-center">
                {selectedSVG ? (
                  <div ref={svgRef} dangerouslySetInnerHTML={{ __html: selectedSVG }} className='svg-modal' />
                ) : (
                  <p>Select an SVG to view</p>
                )}
                <div className="mt-3 download-container" >
                  <button className="btn btn-primary me-2" onClick={downloadPNG}>Download PNG</button>
                  <button className="btn btn-secondary" onClick={downloadSVG}>Download SVG</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}