import { Box, Container, Flex, Heading, Input, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { useState, useEffect } from "react";

const Index = () => {
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [apiKey, setApiKey] = useState("YOUR_API_KEY");
  const [apiUrl, setApiUrl] = useState("https://api.openweathermap.org/data/2.5");
  const [forecast, setForecast] = useState([]);

  const handleSearch = async () => {
    try {
      const currentWeatherResponse = await fetch(`${apiUrl}/weather?q=${location}&units=metric&appid=${apiKey}`);
      if (!currentWeatherResponse.ok) {
        throw new Error("Location not found");
      }
      const currentWeatherData = await currentWeatherResponse.json();
      setWeather(currentWeatherData);
      setError(null);

      const forecastResponse = await fetch(`${apiUrl}/forecast?q=${location}&units=metric&appid=${apiKey}`);
      if (!forecastResponse.ok) {
        throw new Error("Forecast data not available");
      }
      const forecastData = await forecastResponse.json();
      setForecast(forecastData.list);
    } catch (error) {
      console.error(error);
      setError("Location not found");
      setWeather(null);
      setForecast([]);
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
            {forecast.map((item, index) => (
              <Box key={index} borderWidth="1px" borderRadius="md" p={4}>
                <Text fontSize="lg" fontWeight="bold">{`Day ${index + 1}`}</Text>
                <Text>Weather: {item.weather[0].description}</Text>
                <Text>Temperature: {item.main.temp}°C</Text>
              </Box>
            ))}
          </SimpleGrid>
        </Box>
      </VStack>
    </Container>
  );
};

export default Index;