import { Box, Container, Flex, Heading, Input, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";

const Index = () => {
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=YOUR_API_KEY`);
      if (!response.ok) {
        throw new Error("Location not found");
      }
      const data = await response.json();
      setWeather(data);
      setError(null);
    } catch (error) {
      console.error(error);
      setError("Location not found");
      setWeather(null);
    }
  };

  return (
    <Container maxW="container.xl" p={4}>
      <Flex as="nav" bg="blue.500" color="white" p={4} align="center">
        <Heading size="md">Weather Forecast</Heading>
        <Input
          placeholder="Enter location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          size="sm"
          ml="auto"
          mr={4}
        />
        <button onClick={handleSearch}>Search</button>
      </Flex>

      <VStack spacing={8} mt={8} align="stretch">
        <Box>
          <Heading size="lg">Current Weather</Heading>
          {error && <Text color="red.500">{error}</Text>}
          {weather && (
            <Box p={4} borderWidth="1px" borderRadius="md">
              <Text fontSize="2xl" fontWeight="bold">
                {weather.name}, {weather.sys.country}
              </Text>
              <Text fontSize="3xl" mt={2}>
                {weather.main.temp}°C
              </Text>
              <Text>{weather.weather[0].description}</Text>
            </Box>
          )}
        </Box>

        <Box>
          <Heading size="lg">Weather Forecast</Heading>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} mt={4}>
            <Box borderWidth="1px" borderRadius="md" p={4}>
              <Text fontSize="lg" fontWeight="bold">Day 1</Text>
              <Text>Weather: Clear</Text>
              <Text>Temperature: 25°C</Text>
            </Box>
            <Box borderWidth="1px" borderRadius="md" p={4}>
              <Text fontSize="lg" fontWeight="bold">Day 2</Text>
              <Text>Weather: Cloudy</Text>
              <Text>Temperature: 22°C</Text>
            </Box>
            <Box borderWidth="1px" borderRadius="md" p={4}>
              <Text fontSize="lg" fontWeight="bold">Day 3</Text>
              <Text>Weather: Rainy</Text>
              <Text>Temperature: 18°C</Text>
            </Box>
          </SimpleGrid>
        </Box>
      </VStack>
    </Container>
  );
};

export default Index;