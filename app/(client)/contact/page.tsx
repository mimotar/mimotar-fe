import React from 'react'
import Footer from '../component/Footer'
import Input from '@/app/commons/Input'
import TextAreaInput from '@/app/commons/TextAreaInput'
import PhoneIcon from "../../assets/icons/phone.svg";
import MapIcon from "../../assets/icons/map.svg";
import EmailIcon from "../../assets/icons/mail.svg";
import PrimaryButton from '@/app/commons/PrimaryButtons';



function page() {
    return (
        <>

            <div className='xl:px-20 sm:px-10 p-4 min-h-40'>

                <div className="grid grid-cols-1 lg:grid-cols-3 w-full gap-8 justify-between my-4 lg:my-8">
                    <div className="grid gap-4 lg:gap-8">
                        <div className="flex flex-col gap-2">
                            <h1 className=' font-bold text-[#0F172A] text-5xl'>  Contact Us</h1>
                            <p className='text-bold text-[#0F172A] text-xl'>Have questions or need assistance?</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <Input labelName='Name' isShowLabel placeholder='Name' />
                        </div>
                        <div className="flex flex-col gap-2">
                            <Input labelName='Email' isShowLabel placeholder='Email' />
                        </div>
                        <div className="flex flex-col gap-2">
                            <TextAreaInput labelName='Message' isShowLabel id={''} />
                        </div>
                        <div className="flex justify-end">
                           <PrimaryButton title=''> Send message</PrimaryButton>
                        </div>
                        
                    </div>
                    <div className="flex flex-col mt-28 gap-10">
                        <div className='flex flex-col items-center justify-center gap-2'>
                            <PhoneIcon />
                            <p className=' font-normal text-lg text-center'> Tel +2349126736456 </p>
                            <p className=' font-normal text-lg text-center'> Sales +2349126736456 </p>
                            <p className=' font-normal text-lg text-center'> Support +2349126736456 </p>
                        </div>
                        <div className='flex flex-col items-center justify-center gap-2'>
                            <MapIcon />
                            <p className=' text-center'> 8, Allen Avenue, Ikeja, Lagos, Nigeria</p>
                        </div>

                    </div>
                    <div className="grid gap-4 lg:gap-8">
                    <div className='flex flex-col items-center justify-center gap-2'>
                            <EmailIcon />
                            <p className=' font-normal text-lg text-center'> Enquires: www.mimotarenquires.com </p>
                            <p className=' font-normal text-lg text-center'> Sales: www.mimotarsales.com </p>
                            <p className=' font-normal text-lg text-center'> Support: www.mimotarsupport.com </p>
                        </div>

                    </div>

                </div>
            </div>
            <Footer />
        </>
    )
}

export default page