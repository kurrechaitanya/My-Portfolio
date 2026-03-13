import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function NeuralNetworkBackground(){

 const particlesInit = async (main:any)=>{
   await loadFull(main);
 };

 return(

 <Particles
   init={particlesInit}

   options={{

     background:{color:"transparent"},

     particles:{

       number:{value:80},

       color:{value:"#00ffff"},

       links:{
         enable:true,
         distance:150,
         color:"#00ffff",
         opacity:0.2
       },

       move:{
         enable:true,
         speed:0.6
       },

       size:{value:2},

       opacity:{value:0.5}

     }

   }}

   className="absolute inset-0 z-[10]"
 />

 );

}