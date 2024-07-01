import React from 'react';
import { Box, Heading, Text, VStack, Flex, Image, Divider } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const About = () => {
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  const coreValues = [
    { title: 'Integrity', description: 'We conduct our business with the highest standards of professionalism and ethical behavior.', image: '/integrity.jpg' },
    { title: 'Quality', description: 'We are committed to providing top-quality products and services to our customers.', image: '/quality.jpg' },
    { title: 'Customer Focus', description: 'Our customers are at the center of everything we do.', image: '/customer_service.jpg' },
    { title: 'Innovation', description: 'We continuously seek new ways to improve our products and services.', image: '/inn.jpg' },
  ];

  const leadershipTeam = [
    { name: 'George Ouma', role: 'Founder & CEO', image: '/path/to/john_doe.jpg', alt: 'George Ouma' },
    { name: 'Celestine Wagumba', role: 'Founder', image: '/path/to/jane_doe.jpg', alt: 'Celestine Wagumba' },
    { name: 'Richard Roe', role: 'Manager', image: '/path/to/richard_roe.jpg', alt: 'Richard Roe' },
  ];

  return (
    <Box p={6} id="about">
      <Heading as="h1" mb={6} fontWeight="bold" fontSize={{ base: '2xl', md: '3xl' }}>
        About Us
      </Heading>

      <VStack spacing={10} align="start" w="full">
        <Box w="full">
          <Heading as="h2" mb={4} fontWeight="bold" fontSize={{ base: 'xl', md: '2xl' }}>
            Company History
          </Heading>
          <Text fontSize={{ base: 'md', md: 'lg' }}>
            Geocel Enterprises was founded in 2012 by George Ouma. Starting as a small family business, it has grown into a leading provider of hardware and construction services in the region. Over the years, Geocel Enterprises has expanded its offerings and built a reputation for quality and reliability.
          </Text>
        </Box>

        <Divider />

        <Box w="full">
          <Heading as="h2" mb={4} fontWeight="bold" fontSize={{ base: 'xl', md: '2xl' }}>
            Core Values
          </Heading>
          <Flex wrap="wrap" justify="space-between">
            {coreValues.map((value, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.5, delay: index * 0.2 }}
                style={{ flex: '1 0 45%', margin: '10px' }}
              >
                <Box maxW="full" bg="white" rounded="xl" shadow="md" overflow="hidden" _hover={{ boxShadow: 'xl' }}>
                  <Flex direction={{ base: 'column', md: 'row' }}>
                    <Box flexShrink="0">
                      <Image boxSize="200px" objectFit="cover" src={value.image} alt={value.title} />
                    </Box>
                    <Box p={8}>
                      <Text className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{value.title}</Text>
                      <Text className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">{value.title}</Text>
                      <Text className="mt-2 text-slate-500">{value.description}</Text>
                    </Box>
                  </Flex>
                </Box>
              </motion.div>
            ))}
          </Flex>
        </Box>

        <Divider />

        <Box w="full">
          <Heading as="h2" mb={4} fontWeight="bold" fontSize={{ base: 'xl', md: '2xl' }}>
            Leadership Team
          </Heading>
          <Flex wrap="wrap" justify="space-between">
            {leadershipTeam.map((leader, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.5, delay: index * 0.2 }}
                style={{ flex: '1 0 30%', margin: '10px' }}
              >
                <Box maxW="full" bg="white" rounded="xl" shadow="md" overflow="hidden" _hover={{ boxShadow: 'xl' }}>
                  <Flex direction={{ base: 'column', md: 'row' }}>
                    <Box flexShrink="0">
                      <Image boxSize="200px" objectFit="cover" src={leader.image} alt={leader.alt} />
                    </Box>
                    <Box p={8} textAlign="center">
                      <Text className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{leader.role}</Text>
                      <Text className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">{leader.name}</Text>
                      <Text className="mt-2 text-slate-500">{leader.role}</Text>
                    </Box>
                  </Flex>
                </Box>
              </motion.div>
            ))}
          </Flex>
        </Box>

        <Divider />

        <Box w="full">
          <Heading as="h2" mb={4} fontWeight="bold" fontSize={{ base: 'xl', md: '2xl' }}>
            Achievements and Milestones
          </Heading>
          <Flex wrap="wrap" justify="space-between">
            {[
              { year: '1990', achievement: 'Geocel Enterprises was founded.' },
              { year: '2000', achievement: 'Expanded to a second location.' },
              { year: '2010', achievement: 'Reached $10 million in annual revenue.' },
              { year: '2020', achievement: 'Awarded "Best Hardware Supplier" in the region.' },
            ].map((milestone, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.5, delay: index * 0.2 }}
                style={{ flex: '1 0 45%', margin: '10px' }}
              >
                <Box maxW="full" bg="white" rounded="xl" shadow="md" overflow="hidden" _hover={{ boxShadow: 'xl' }}>
                  <Flex direction={{ base: 'column', md: 'row' }}>
                    <Box flexShrink="0">
                      <Image boxSize="200px" objectFit="cover" src="/img/building.jpg" alt="Modern building architecture" />
                    </Box>
                    <Box p={8}>
                      <Text className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{milestone.year}</Text>
                      <Text className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">{milestone.year}</Text>
                      <Text className="mt-2 text-slate-500">{milestone.achievement}</Text>
                    </Box>
                  </Flex>
                </Box>
              </motion.div>
            ))}
          </Flex>
        </Box>
      </VStack>
    </Box>
  );
};

export default About;
