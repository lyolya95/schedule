import './basic-styles.scss'

import React from "react";

export const Paragraph = ({children}) =>  (
    <p className="paragraph">{children}</p>
  )

export const FirstLogo = ({height = 100, width = 100}) => (
  <img src="https://rs.school/images/rs_school.svg" alt="first logo" height={`${height}px`} width={`${width}px`}/>
)

export const SecondLogo = ({height = 100, width = 100}) => (
  <img src="https://rollingscopes.com/images/logo_rs_text.svg" alt="second logo" height={`${height}px`} width={`${width}px`}/>
)

export const BackGround = ({children, color = '#FFD641'}) => (
  <div style={{
    backgroundColor: color,
  }}>
    {children}
  </div>
)

export const HeaderOne = ({children}) =>  (
  <h1>{children}</h1>
)
export const HeaderTwo = ({children}) =>  (
  <h2>{children}</h2>
)
export const HeaderThree = ({children}) =>  (
  <h3>{children}</h3>
)
export const HeaderFour= ({children}) =>  (
  <h4>{children}</h4>
)
export const HeaderFive = ({children}) =>  (
  <h5>{children}</h5>
)
export const HeaderSix = ({children}) =>  (
  <h6>{children}</h6>
)
