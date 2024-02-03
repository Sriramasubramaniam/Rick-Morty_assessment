import ReactDOM from "react-dom/client";
import DisplayCharacters from "./render/DisplayCharacters.tsx";
import { ChakraProvider } from "@chakra-ui/react";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <ChakraProvider>
        <DisplayCharacters />
    </ChakraProvider>
);

