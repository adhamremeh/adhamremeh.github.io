import reactLogo from './media/react_logo.svg';
import unityLogo from './media/Unity_logo_black.svg';
import pygameLogo from './media/pygame_logo.png';
import githubLogo from './media/Github_Logo.png';
import twitterLogo from './media/Twitter_Logo.png';
import playLogo from './media/Play_Logo.png';
import linkedinLogo from './media/Linkedin_Logo.png';

import pic from './media/Personal_Pic.jpg';
import pic0 from './media/PersonalPic0.png';
import pic1 from './media/PersonalPic1.png';
import pic2 from './media/PersonalPic2.png';
import pic3 from './media/PersonalPic3.png';
import pic4 from './media/PersonalPic4_1.png';

import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useCallback } from 'react';


import './General.css';
import './Main.css';
import './About.css';
import './Technologies.css';
import './Projects.css';
import './Contacts.css';

function Main() {
  
  const [isIntersecting, setIsIntersecting] = useState(false);
  const refo = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: "0.1" }
    );
    observer.observe(refo.current);

    return () => observer.disconnect();
  }, [isIntersecting]);

  useEffect(() => {
    if (isIntersecting) {
      refo.current.classList.add("Info-transition");
    } else {
      refo.current.classList.remove("Info-transition"); 
    }
  }, [isIntersecting]);


  ////////////////////////////////////////////////

  const AboutRef = useRef(null);
  const TechRef = useRef(null);
  const ProjRef = useRef(null);
  const ContRef = useRef(null);
  
  const refs = [AboutRef, TechRef, ProjRef ,ContRef]
  
  const handleClick = section => {
    refs.map((ref, index) => {
      if (index == section)
      {ref.current?.scrollIntoView({ behavior: "smooth" }); }
    });
    
  }

  const [cardID, setcardID] = useState(-1);

  function handleClickCard(ID) {
    return setcardID(ID.target.id);
  }

  function setPos(newPosX, newPosY) {
    document.documentElement.style.setProperty("--posX", newPosX);
    document.documentElement.style.setProperty("--posY", newPosY);
  }


  useEffect(() => {
    document.querySelectorAll(".projectCard").forEach(item => {
      if (item.id == cardID){
        var bounds = item.getBoundingClientRect();
        var tempBound = document.querySelector(".test").getBoundingClientRect();

        const offSetX = (tempBound.right - bounds.right);
        const offSetY = (((window.innerHeight / 2) - bounds.top > bounds.bottom ? bounds.top : bounds.bottom) - 165);

        setPos(parseInt(offSetX).toString() + "px", parseInt(offSetY).toString() + "px");

        item.classList.add("showCard");
        item.classList.remove("hoverCard");
        document.body.classList.add("bodyStop");

      }
      else{
        
        item.classList.remove("showCard");
        item.classList.add("hoverCard");
      }
    })
    if (cardID == "")
    {
      document.body.classList.remove("bodyStop");
    }

    
  }, [cardID])
  
  

  return (
    <div className="Main">
      <BlogHeader handleClick={handleClick} />
      <About refe={AboutRef} animate={refo}/>
      <Techs refe={TechRef} />
      <Projects refe={ProjRef} clickFunc={handleClickCard} />
      <Contact refe={ContRef}/>
    </div>
  );

}

function BlogHeader({handleClick}) {
  
  
  const Pics = [pic0, pic1, pic2, pic3, pic4]
  
  return (
    <header className="App-header">
      <div className='MainBWrapper'>
        <button onClick={() => handleClick(0)} >About Me</button>
        <button onClick={() => handleClick(1)} >Technologies</button>
        <button onClick={() => handleClick(2)} >Projects</button>
        <button onClick={() => handleClick(3)} >Contacts</button>

      </div>
      
      <div className='PicsWrapper'>
        <img src={pic0} className="Personal_Pic0" alt="logo" />
        <img src={pic1} className="Personal_Pic1" alt="logo" />
        <img src={pic2} className="Personal_Pic2" alt="logo" />
        <img src={pic3} className="Personal_Pic3" alt="logo" />
        <img src={pic4} className="Personal_Pic4" alt="logo" />
      </div>

    </header>
  );
  
}

function About({refe, animate}) {

  return (
    <div ref={refe} className='aboutWrapper'>
      <h1 className='aboutTitle'>
        About me
      </h1>
      <div className='Info Info-transition' ref={animate}>
        <p>
          Adham Remeh
        </p>
        <p>
          Passionate Game Developer
        </p>
        <p>
          Hard Worker
        </p>
        <p>
          Made a lot of intersting projects
        </p>
      </div>
    </div >
  );

}

function Techs({ refe }) {

  let items = [reactLogo, unityLogo, pygameLogo, githubLogo, reactLogo, unityLogo, githubLogo]
  let components = []

  let imgTag = "tech" + "Logo"
  let containerTag = "tech" + "Container"
  let HeaderTag = "tech" + "Header"


  items.forEach((item, index) => {
    components.push(<img src={item} className={imgTag} />);
  })

  return (

    <div ref={refe} className={containerTag}>
      <div className='techHeaderWrapper' >
        <h1 className={HeaderTag}>
          Technologies
        </h1>
        <h1 className={HeaderTag+"1"}>
          Technologies
        </h1>
        <h1 className={HeaderTag+"2"}>
          Technologies
        </h1>
      </div>
      <div className="Technologies">
        {components}
      </div>
    </div>

  );

}

function Projects(props) {

  const cardsData = [
    {Title: "React Website", Pic: reactLogo, Desc: "A website made with react and css"},
    { Title: "Mouse Control With Hand", Pic: pygameLogo, Desc: "A website made with react and css" },
    { Title: "Mouse Control With Hand", Pic: pygameLogo, Desc: "A website made with react and css" },
    { Title: "Mouse Control With Hand", Pic: pygameLogo, Desc: "A website made with react and css" },
    { Title: "Mouse Control With Hand", Pic: pygameLogo, Desc: "A website made with react and css" }

  ];

  const cards = cardsData.map((item, index) =>

    <div className='projectCard' id={index} onClick={props.clickFunc.bind(index)} >
      <img src={item.Pic} id={index} />
      <p className='Title' id={index}>
          Title
        <p id={index}>
          {item.Title}
        </p>
      </p>
    </div>

  );

  return (

    <div ref={props.refe} className='projectContainer' onClick={props.clickFunc.bind(7)}>
      <h1 className='projectHeader'>Best Projects</h1>
      <div className='projectWrapper'>
        <div className='Projects'>
          <div className='test'>

          </div>
          {cards}
        </div>
      </div>
    </div>

  );

}

function Contact({refe}) {

  const Links = {
    "Github": "https://github.com/adhamremeh",
    "Play Store": "https://play.google.com/store/apps/dev?id=8567705922105068521",
    "Twitter": "https://twitter.com/DoomY84530284",
    "Linkedin": "https://www.linkedin.com/in/adham-remeh-5aba86256/"
  };

  const Logos = [githubLogo, playLogo, twitterLogo, linkedinLogo]
  
  return (

    <div ref={refe} className='contactsContainer'>
      <div className='contactsWrapper'>
        <h1 className='contactsHeader'> Reach me via </h1>
        <ul className='LinksList'>
          {Object.keys(Links).map((key, index) => (
            <li> <a href={Links[key]} target='_blank' > <img src={Logos[index]} className='contactLogo' /> {key} </a> </li>
          ))}       
        </ul>
      </div>
    </div>

  );

}


export default Main;
