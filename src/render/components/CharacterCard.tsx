import { Card, Flex, Image, Text } from "@chakra-ui/react";
import { CharacterDetail } from "../../network/httpClient";

const CharacterCard = ({ name, status, image }: CharacterDetail) => {
    return (
        <Card w={"40rem"} h={"16rem"} m={8} borderRadius={8}>
            <Flex h={"100%"}>
                <Flex direction={"column"} justifyContent={"center"}>
                    <Image
                        src={image}
                        alt={name}
                        boxSize="200px"
                        objectFit="cover"
                        margin={8}
                        borderRadius={8}
                    />
                </Flex>
                <Flex direction={"column"} my={8}>
                    <Text fontSize={"4xl"} maxW={"20rem"}>
                        {name}
                    </Text>
                    <Text fontSize={"2xl"}>{status}</Text>
                </Flex>
            </Flex>
        </Card>
    );
};

export default CharacterCard;

