import './basic-styles.scss';
import React from 'react';

export const Paragraph = ({ children }: any) => <p className="paragraph"> {children} </p>;

export const FirstLogo = () => (
  <img src="https://rs.school/images/rs_school.svg" alt="first logo" className="logo__header__img" />
);
// export const FirstLogo = ({height = 100, width = 100}) => (
//   <img src="https://rs.school/images/rs_school.svg" alt="first logo" height={`${height}px`} width={`${width}px`}/>
// )
export const SecondLogo = ({ height = 100, width = 100 }) => (
  <img src="https://rollingscopes.com/images/logo_rs_text.svg" alt="second logo" height={`${height}px`} width={`${width}px`} />
);

export const BackGround = ({ children, color = '#FFD641' }: any) => (
  <div
    style={{
      backgroundColor: color,
    }}
  >
    {' '}
    {children}{' '}
  </div>
);

export const HeaderOne = ({ children }: any) => <h1> {children} </h1>;
export const HeaderTwo = ({ children }: any) => <h2> {children} </h2>;
export const HeaderThree = ({ children }: any) => <h3> {children} </h3>;
export const HeaderFour = ({ children }: any) => <h4> {children} </h4>;
export const HeaderFive = ({ children }: any) => <h5> {children} </h5>;
export const HeaderSix = ({ children }: any) => <h6> {children} </h6>;
