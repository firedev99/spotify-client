import styled from "styled-components/macro"

export const Container = styled.div`
width: 100%;
min-height: 256px;
margin-bottom: 16px;
h3 {
    font-size: 24px !important;
}
p {
    font-size: 14px;
}
`;

export const SectionWrapper = styled.div`
display: grid;
width: 100%;
height: 100%;
grid-template-columns: repeat(6, minmax(156px, 1fr));
column-gap: 24px;
`;
