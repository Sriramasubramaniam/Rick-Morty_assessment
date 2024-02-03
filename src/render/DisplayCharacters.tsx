import { ChangeEvent, useEffect, useState } from "react";
import { CharacterDetail, genericGetCall } from "../network/httpClient";
import CharacterCard from "./components/CharacterCard";
import { Checkbox, Flex, Input, Text, useToast } from "@chakra-ui/react";

const DisplayCharacters = () => {
    const toast = useToast();
    //state
    const [charactersInfo, setCharactersInfo] = useState<CharacterDetail[]>([]);
    const [filters, setFilters] = useState<FilterDeps>({
        name: "",
        alive: false,
        dead: false,
    });
    const [nameInput, setNameInput] = useState<string>("");

    //side effects
    useEffect(() => {
        refreshCharactersData(filters);
    }, [filters]);
    useEffect(() => {
        refreshCharactersData(filters);
    }, [filters]);

    //debouncer
    useEffect(() => {
        const timer = setTimeout(() => {
            setFilters((prevFilters) => ({
                ...prevFilters,
                name: nameInput,
            }));
        }, 1000);
        return () => clearTimeout(timer);
    }, [nameInput]);

    //api function
    const refreshCharactersData = async (filters: FilterDeps) => {
        const characters = await genericGetCall(
            "https://rickandmortyapi.com/api/character",
            filters
        );
        characters
            ? setCharactersInfo(characters.charactersData)
            : toast({
                  title: "Error retrieving characters",
                  description: "Please check your network or contact support.",
                  status: "error",
                  duration: 2000,
                  isClosable: true,
                  position: "top",
              });
    };

    //handler functions
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNameInput(e.target.value);
    };
    const handleCheckboxChange = (type: Status, e: ChangeEvent<HTMLInputElement>) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            [type]: e.target.checked,
        }));
    };

    return (
        <Flex justifyContent={"center"}>
            <Flex direction={"column"}>
                <Text m={8} fontSize={"4xl"} textAlign={"center"}>
                    Welcome to the Rick & Morty show
                </Text>
                <Flex justifyContent={"space-between"} m={8}>
                    <Input
                        placeholder="Search by name"
                        value={nameInput}
                        onChange={handleInputChange}
                        w={"30rem"}
                    />
                    <Flex>
                        <Checkbox
                            checked={filters.alive}
                            onChange={(e) => handleCheckboxChange(Status.Alive, e)}
                            mx={5}
                        >
                            Alive
                        </Checkbox>
                        <Checkbox
                            checked={filters.dead}
                            onChange={(e) => handleCheckboxChange(Status.Dead, e)}
                            mx={5}
                        >
                            Dead
                        </Checkbox>
                    </Flex>
                </Flex>
                {charactersInfo.map((info) => (
                    <CharacterCard name={info.name} status={info.status} image={info.image} />
                ))}
            </Flex>
        </Flex>
    );
};

export interface FilterDeps {
    name: string;
    alive: boolean;
    dead: boolean;
}
enum Status {
    Alive = "alive",
    Dead = "dead",
}

export default DisplayCharacters;

