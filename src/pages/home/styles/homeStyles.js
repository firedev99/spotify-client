import styled from "styled-components/macro";

export const Wrapper = styled.div`
    height: 100%;
    max-height: calc(100vh - 138px);
    width: 100%;
    background-image: linear-gradient(rgba(0,0,0,.6) 0,#121212 100%);
    overflow: hidden;
    overflow-y: auto;
    user-select: none;
`;

export const Container = styled.div`
    padding: 32px;
    width: 100%;
    h3 {
        font-size: 32px;
        font-weight: 700;
        color: rgba(255, 255, 255, 0.95);
        text-shadow: 1px 2px 8px rgba(0, 0, 0, 0.2);
    }
`;

export const Top = styled.div`
    width: 100%;
`;

export const TopInner = styled.div`
    margin: 20px 0 32px 0;
    height: 100%;
    width: 100%;
    display: grid;
    /* grid-template-columns: repeat(4, minmax(224px, 1fr)); */
    column-gap: 24px;
    row-gap: 16px;
`;

export const RecommendedSection = styled.div`
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    row-gap: 24px;
    margin-bottom: 104px;
`;