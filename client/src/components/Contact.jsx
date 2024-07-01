import React from 'react';
import {
  Box,
  Heading,
  Text,
  VStack,
  Link,
  HStack,
  Icon,
} from '@chakra-ui/react';
import { FaPhone, FaEnvelope, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const center = {
  lat: -0.0923,
  lng: 34.2863
};

const Contact = () => {
  return (
    <Box p={6}>
      <Heading as="h1" mb={6} fontSize="3xl" fontWeight="bold">
        Contact Us
      </Heading>

      <VStack spacing={10} align="start">
        <Box>
          <Heading as="h2" mb={4} fontSize="2xl" fontWeight="bold">
            Get in Touch
          </Heading>
          <HStack mb={4}>
            <Icon as={FaPhone} boxSize={8} />
            <Text fontSize="xl">+254 726 588 499</Text>
          </HStack>
          <HStack mb={4}>
            <Icon as={FaEnvelope} boxSize={8} />
            <Link href="mailto:geocelenterprices2020@gmail.com" fontSize="xl">
              geocelenterprices2020@gmail.com
            </Link>
          </HStack>
          <HStack spacing={4} mb={4}>
            <Link href="https://facebook.com/geocel" isExternal>
              <Icon as={FaFacebook} boxSize={10} />
            </Link>
            <Link href="https://twitter.com/geocel" isExternal>
              <Icon as={FaTwitter} boxSize={10} />
            </Link>
            <Link href="https://instagram.com/geocel" isExternal>
              <Icon as={FaInstagram} boxSize={10} />
            </Link>
          </HStack>
        </Box>

        <Box width="100%" height="400px">
          <Heading as="h2" mb={4} fontSize="2xl" fontWeight="bold">
            Our Location
          </Heading>
          <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={15}
            >
              <Marker position={center} />
            </GoogleMap>
          </LoadScript>
        </Box>
      </VStack>
    </Box>
  );
};

export default Contact;
