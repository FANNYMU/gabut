import React from 'react';
import '../styles/home.css'

const ContentRight = () => {
    return (
        <div className='flex profileRight'>
            <img className='profileContentRight' src="../../images/profile.jfif" style={{ borderRadius: "50%" }} alt="" width={52} />
            <h1 className='titleRight text-lg'>TutorWeb.ID (Discussion)</h1>
        </div>
    );
}

export default ContentRight;
