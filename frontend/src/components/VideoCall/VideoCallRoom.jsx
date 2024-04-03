import React from 'react'
import { useLocation } from 'react-router-dom'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';



function VideoCallRoom() {

    const location = useLocation();

    const roomId = location.state?.roomId;


    let myMetting = async (element) => {

        const appId = 309407206;
        const serverSecret = "56ef694f0da109be85982c8420a664f4";

        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appId, serverSecret, roomId, Date.now().toString(), "Rajan ");



        // Create instance object from Kit Token.
        const zp = ZegoUIKitPrebuilt.create(kitToken);


        // start the call
        zp.joinRoom({
            container: element,
            sharedLinks: [
                {
                    name: 'Personal link',
                    url:
                        window.location.protocol + '//' +
                        window.location.host + window.location.pathname +
                        '?roomId=' +
                        roomId,
                },
            ],
            scenario: {
                mode: ZegoUIKitPrebuilt.OneONoneCall,
            },
        });






    }


    return (
        <div ref={myMetting}>

        </div>
    )
}

export default VideoCallRoom
