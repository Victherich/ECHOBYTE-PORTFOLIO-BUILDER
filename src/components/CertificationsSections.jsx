import React from 'react'
import BiographySection1 from './BiographySection1'
import CertificationsSection1 from './CertificationsSection1'

const CertificationsSections = ({certifications}) => {
  return (
    <div>
      <CertificationsSection1 certifications={certifications}/>
    </div>
  )
}

export default CertificationsSections