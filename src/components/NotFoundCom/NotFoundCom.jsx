import React from 'react'

const NotFoundCom = () => {
    return (
        <><div className='container-ntf'>
        {[...Array(30)].map((_, i) => (
          <div key={i} className="star-1-ntf"></div>
        ))}
        {[...Array(30)].map((_, i) => (
          <div key={i} className="star-2-ntf"></div>
        ))}
        <div className="container-ntf container-bird-ntf">
          {[...Array(30)].map((_, i) => (
            <div key={i} className="bird-ntf bird-anim-ntf">
              <div className="bird-container-ntf">
                <div className="wing-ntf wing-left-ntf">
                  <div className="wing-left-top-ntf"></div>
                </div>
                <div className="wing-ntf wing-right-ntf">
                  <div className="wing-right-top-ntf"></div>
                </div>
              </div>
            </div>
          ))}
          <div className="container-title-ntf">
            <div className="title-ntf">
              <div className="number-ntf">4</div>
              <div className="moon-ntf">
                <div className="face-ntf">
                  <div className="mouth-ntf"></div>
                  <div className="eyes-ntf">
                    <div className="eye-left-ntf"></div>
                    <div className="eye-right-ntf"></div>
                  </div>
                </div>
              </div>
              <div className="number-ntf">4</div>
            </div>
            <div className="subtitle-ntf">Oops. Looks like you took a wrong turn.</div>
            <a className="goBack" href="/">Go back</a>
          </div>
        </div>
      </div></>
    )
}

export default NotFoundCom