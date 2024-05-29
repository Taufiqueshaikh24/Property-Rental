import { 
    FacebookShareButton, 
    WhatsappShareButton,
    TwitterShareButton,
    EmailShareButton,
    FacebookIcon,
    WhatsappIcon,
    TwitterIcon,
    EmailIcon

 } from "react-share"

export default function ShareButton({ property}){

      const shareUrl = `${process.env.LOCALHOST}/properties/${property._id}`; 

      return (
        <>
             <h3 className="text-xl font-bold text-center pt-2">
               Share This Property:
               <div className="flex gap2 justify-center mt-2 pb-5">
                   <FacebookShareButton
                     url={shareUrl}
                     quote={property.name}
                     hashtag={`${property.type}ForRent`}
                    >
                     <FacebookIcon size={40} round={true} />
                   </FacebookShareButton>
                   <TwitterShareButton
                     url={shareUrl}
                     title={property.name}
                     hashtags={[`${property.type}ForRent`]}
                   >
                      <TwitterIcon size={40} round={true} className="ml-2" />
                   </TwitterShareButton>
                   <WhatsappShareButton
                    url={shareUrl}
                     title={property.name}
                     separator="::"
                   >
                      <WhatsappIcon size={40} round={true} className="ml-2" />
                   </WhatsappShareButton>
                   <EmailShareButton className="ml-2"
                     url={shareUrl}
                      title={property.name}
                      body={`Check out this property lising : ${shareUrl}` }
                   >
                       <EmailIcon size={40} round={true} />
                   </EmailShareButton>
               </div>
             </h3>
        </>
      )
}