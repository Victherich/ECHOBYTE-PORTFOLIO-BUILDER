import React from 'react'
import PersonalDetailsSection1 from './PersonalDetailsSection1'


const PersonalDetailSections = ({data,profile}) => {
  return (
    <div>
      {/* <PersonalDetailsSection1 data={data}/> */}
      <PersonalDetailsSection1 data={data} profile={profile}/>
      
    </div>
  )
}

export default PersonalDetailSections
