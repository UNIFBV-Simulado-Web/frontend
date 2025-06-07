import styled from 'styled-components';

export const Fundo = styled.div`
    background:
        radial-gradient(ellipse at top, #233942, 85%, transparent);
        radial-gradient(farthest-corner at bottom, #ffffff , 35%, transparent);
    min-height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Line = styled.div`
    height: 1px;
    background-color: #fff;
    margin: 20px 0;
`;