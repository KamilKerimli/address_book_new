import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCube, Navigation, Autoplay } from 'swiper/modules';
import expressjsIcon from "../../assets/expressjs.png";
import mongoDBIcon from "../../assets/mongoDB.png";
import nodeJSIcon from "../../assets/nodeJS.ico";
import reactIcon from "../../assets/react.png";
import VSCodeIcon from "../../assets/VSCode.png";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cube';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import { useNavigate } from 'react-router-dom';

const HomeCom = () => {
    const nav = useNavigate();
    const [email, setEmail] = useState('');

    const subscribeUser = async () => {
        try {
            const response = await fetch(`http://localhost:1144/users/subscribe`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email
                }),
            });
            
            const result = await response.json();
            alert(result.message);
            if (!response.ok) {
                return;
            }
        } catch (error) {
            alert("Server error. Please try again. ");
        }
    }

  return (
    <section className="mx-auto px-4 dark:bg-gray-800 pb-12">
        <section className="text-center py-12">
            <h1 className="text-4xl font-bold text-blue-600 mb-4 dark:text-white">You have come to the Address Book.</h1>
            <p className="text-gray-600 mb-8 dark:text-gray-400">Everything is for your information. You can search for the address.</p>
            <button onClick={() => {nav('/advsearch')}} className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300 buttonStyle">Get Started</button>
        </section>

        <section className="bg-gradient-to-r from-blue-400 to-blue-600 text-white p-8 rounded-lg shadow-lg text-center mb-12 
                            dark:bg-gradient-to-r dark:from-white dark:to-white dark:text-blue-600">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <h2 className="text-2xl font-bold">100+</h2>
                    <p>Users</p>
                </div>
                <div>
                    <h2 className="text-2xl font-bold">10,000+</h2>
                    <p>Address</p>
                </div>
                <div>
                    <h2 className="text-2xl font-bold">500+</h2>
                    <p>Phones</p>
                </div>
            </div>
        </section>

        <section className="bg-gradient-to-r from-blue-600 to-blue-400 text-white p-8 rounded-lg shadow-lg flex flex-col lg:flex-row items-center justify-between mb-12 
                            dark:bg-gradient-to-r dark:from-white dark:to-white dark:text-blue-600">
            <div className="text-center lg:text-left mb-6 lg:mb-0">
                <h2 className="text-2xl font-bold mb-2">Subscribe to our Newsletter</h2>
                <p className="text-gray-200 dark:text-gray-600">Stay up-to-date with the latest news and updates</p>
            </div>
            <form className="flex w-full lg:w-auto">
                <input 
                    type="email" 
                    placeholder="Enter your email address" 
                    className="w-full lg:w-64 px-4 py-2 rounded-l-lg text-gray-800 focus:outline-none
                                dark:bg-blue-600 dark:text-white dark:placeholder:text-white" 
                                onChange={(e) => setEmail(e.target.value)}/>
                <button type="submit" 
                    className="bg-white text-blue-600 px-6 py-2 rounded-r-lg hover:bg-blue-600 hover:text-white transition duration-1000 
                                dark:bg-blue-600 dark:text-white dark:hover:bg-white dark:hover:text-blue-600"
                    onClick={()=>{ subscribeUser(); }}>Subscribe</button>
            </form>
        </section>

        <section className="bg-gradient-to-r from-blue-600 to-blue-400 p-8 rounded-lg shadow-lg text-center mb-12 
                            dark:bg-gradient-to-r dark:from-white dark:to-white">
            <h2 className="text-2xl font-bold text-white dark:text-blue-600 mb-4">More information on Address Book</h2>
            <p className="text-white dark:text-gray-600 mb-4">Discover why our Address Book platform is awarded for its superior features and quality.</p>
            <button className="bg-white text-blue-600 px-6 py-2 rounded-lg hover:bg-blue-400 hover:text-white transition duration-300 buttonStyle
                               dark:bg-blue-600 dark:text-white"
                    onClick={() => {nav('/about')}}>Learn More</button>
        </section>

        <section className="bg-blue-600 p-8 rounded-lg shadow-lg overflow-hidden pb-12
                            dark:bg-white">
            <h2 className="text-2xl font-bold text-white dark:text-blue-600 mb-6 text-center">Technologies used in this web application</h2>
            <Swiper
                modules={[EffectCube, Navigation, Autoplay]}
                effect={'cube'}
                grabCursor={true}
                centeredSlides={true}
                cubeEffect={{
                    shadow: false,
                    slideShadows: true,
                    shadowOffset: 20,
                    shadowScale: 0.94,
                }}
                autoplay={{ delay: 2000 }}
                navigation
                className='w-1/4'>
                <SwiperSlide 
                    style={{justifyItems: 'center'}}>
                    <img src={expressjsIcon} style={{width: '330px', height: '330px', objectFit: 'cover'}}  alt="expressjs" />
                </SwiperSlide>
                <SwiperSlide 
                    style={{justifyItems: 'center'}}>
                    <img src={mongoDBIcon} style={{width: '330px', height: '330px', objectFit: 'cover'}}  alt="mongoDB" />
                </SwiperSlide>
                <SwiperSlide 
                    style={{justifyItems: 'center'}}>
                    <img src={nodeJSIcon} style={{width: '330px', height: '330px', objectFit: 'cover'}}  alt="nodejs" />
                </SwiperSlide>
                <SwiperSlide 
                    style={{justifyItems: 'center'}}>
                    <img src={reactIcon} style={{width: '330px', height: '330px', objectFit: 'cover'}}  alt="react" />
                </SwiperSlide>
                <SwiperSlide 
                    style={{justifyItems: 'center'}}>
                    <img src={VSCodeIcon} style={{width: '330px', height: '330px', objectFit: 'cover'}}  alt="VSCode" />
                </SwiperSlide>
            </Swiper>
        </section>
    </section>
  )
}

export default HomeCom