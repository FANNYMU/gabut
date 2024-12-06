import React from 'react';
import '../styles/home.css'

const Content = () => {
    return (
        <div className='flex'>
            <img className='profileContent' src="../../images/profile.jfif" style={{ borderRadius: "50%" }} alt="" width={52} />
            <h1 className='title text-lg'>TutorWeb.ID (Discussion)</h1>
            <p className='desc'>Test</p>
        </div>
    );
}

export default Content;
