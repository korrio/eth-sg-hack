import React from 'react';
import { Box, Card, Flex, Inset, Text } from '@radix-ui/themes';

const Index = () => {
  return (
    <div>
      <Card size="1">
        <Flex>
          <Inset side="left" pr="current">
            <Flex
              align="center"
              justify="center"
              px="7"
              style={{ background: '#24292F', height: '100%' }}
            >
              <div>logo</div>
            </Flex>
          </Inset>
          <Box style={{ maxWidth: 400 }}>
            <Text as="div" color="gray" mb="1" size="2">
              github.com
            </Text>
            <Text size="5">
              Official Node.js SDK for interacting with the AcmeCorp API.
            </Text>
          </Box>
        </Flex>
      </Card>
    </div>
  );
};

export default Index;
