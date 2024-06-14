import React, { useEffect, useRef } from "react";
import { Container, VStack, Box, Button, HStack } from "@chakra-ui/react";
import cornerstone from "cornerstone-core";
import cornerstoneTools from "cornerstone-tools";
import cornerstoneWADOImageLoader from "cornerstone-wado-image-loader";
import dicomParser from "dicom-parser";
import Hammer from "hammerjs";

cornerstoneTools.external.cornerstone = cornerstone;
cornerstoneTools.external.Hammer = Hammer;
cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
cornerstoneWADOImageLoader.external.dicomParser = dicomParser;

cornerstoneTools.init();

const Index = () => {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    cornerstone.enable(element);

    const imageId = "wadouri:http://example.com/path/to/dicom/file.dcm"; // Replace with actual DICOM file URL
    cornerstone.loadImage(imageId).then((image) => {
      cornerstone.displayImage(element, image);
    });

    return () => {
      cornerstone.disable(element);
    };
  }, []);

  const handleZoomIn = () => {
    const element = elementRef.current;
    const viewport = cornerstone.getViewport(element);
    viewport.scale += 0.1;
    cornerstone.setViewport(element, viewport);
  };

  const handleZoomOut = () => {
    const element = elementRef.current;
    const viewport = cornerstone.getViewport(element);
    viewport.scale -= 0.1;
    cornerstone.setViewport(element, viewport);
  };

  const handleReset = () => {
    const element = elementRef.current;
    cornerstone.reset(element);
  };

  return (
    <Container centerContent maxW="container.xl" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} width="100%">
        <Box ref={elementRef} width="512px" height="512px" bg="black" />
        <HStack spacing={4}>
          <Button onClick={handleZoomIn}>Zoom In</Button>
          <Button onClick={handleZoomOut}>Zoom Out</Button>
          <Button onClick={handleReset}>Reset</Button>
        </HStack>
      </VStack>
    </Container>
  );
};

export default Index;