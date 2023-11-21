import React from "react";
import {ComponentPreview, Previews} from "@react-buddy/ide-toolbox";
import {PaletteTree} from "./palette";
import Header from "../components/Header";
import {App} from "../App";
import {Home_page} from "../pages/home";
import {MainScreen} from "../components/MainScreen";
import {Formpost} from "../components/Formpost";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/Header">
                <Header avatar={"https://avatars.githubusercontent.com/u/57472882?v=4"}/>
            </ComponentPreview>
            <ComponentPreview path="/App">
                <App/>
            </ComponentPreview>
            <ComponentPreview path="/Home_page">
                <Home_page/>
            </ComponentPreview>
            <ComponentPreview path="/MainScreen">
                <MainScreen/>
            </ComponentPreview>
            <ComponentPreview path="/Formpost">
                <Formpost/>
            </ComponentPreview>
        </Previews>
    );
};

export default ComponentPreviews;