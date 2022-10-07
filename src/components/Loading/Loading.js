import React from 'react'

import ReactLoading from "react-loading";
import { Section, Article, Title } from "./generic";
import "./style.css";

function Loading() {
    return (
        <div>
            <Section style={{
                padding: "0",
                marginTop: "250px"
            }} >
                <Title>Restaurant List Loading</Title>
                <Article >
                    <ReactLoading type="balls" color="black" />
                </Article>
            </Section>
        </div>

    )
}

export default Loading