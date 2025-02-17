import React from 'react'
import PatternImg from "../../assets/VSCode.png";

const AboutCom = () => {
  return (
    <div class="container mx-auto px-4 py-8 ">
        <div class="bg-white rounded-lg overflow-hidden shadow-xl shadow-blue-400">
            <h1 class="text-3xl font-bold bg-gradient-to-t from-blue-600 to-blue-400 text-white text-center py-4">About</h1>
            <div class="flex flex-col lg:flex-row px-4 pt-16 lg:px-10">
                <div class="w-full lg:w-1/2 mb-8 lg:mb-0">
                    <h1 class="text-black text-center lg:text-start text-3xl lg:text-5xl font-semibold mb-6">Enhance your learning experience with interactive video features.</h1>
                    <p class="text-gray-700 text-center lg:text-start text-lg lg:text-xl font-bold mb-6">
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate officia consequuntur necessitatibus exercitationem veritatis quae ex fugit maxime sit dicta odio, soluta accusantium molestias vitae unde repudiandae suscipit magni nobis?</p>
                </div>
                <div class="w-full lg:w-1/2 flex justify-center items-center">
                    <img class="w-48 h-48 lg:w-60 lg:h-60" src={PatternImg} alt="VS Code" />
                </div>
            </div>
            <p class="px-4 lg:px-10 text-black  text-base lg:text-lg font-bold mt-6 pb-6">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea ducimus repellat ipsum ipsa quasi alias architecto, temporibus sit error dolorem, veniam ipsam! A error consequatur, provident possimus optio eius velit?
            </p>
        </div>
    </div>
  )
}

export default AboutCom