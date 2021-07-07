import React, { useContext, useEffect, useState } from 'react'
// styled-components
import { Wrapper, DeviceOptions } from "./styles/funcStyles"
// utils
import reqWithToken from '../../utils/reqWithToken'
// icons
import { DeviceIcon, VolumeIcon, MaximixeIcon, MonitorIcon, SmartPhoneIcon } from '../../helpers/icons'
// context
import { TokenContext } from '../../utils/context';
import updateWithToken from '../../utils/updateWithToken';

export default function PlayerFunctionality({ toggleDevice = false, setToggleDevice }) {
    const spotifyToken = useContext(TokenContext);

    const [devices, setDevices] = useState([]);

    useEffect(() => {
        if (toggleDevice && typeof spotifyToken !== 'undefined') {
            const getDeviceInfo = async _ => {
                const requestFunc = reqWithToken('https://api.spotify.com/v1/me/player/devices', spotifyToken);
                try {
                    const { data: { devices } } = await requestFunc();
                    setDevices(devices)
                } catch (error) {
                    console.log(error)
                }
            }
            getDeviceInfo();
        }
    }, [toggleDevice, spotifyToken])

    const switchDevice = (id) => {
        if (typeof spotifyToken !== 'undefined') {
            const data = { device_ids: [id] };
            const requestTransfer = async _ => {
                const reqFunction = updateWithToken('https://api.spotify.com/v1/me/player', spotifyToken, data);
                try {
                    const response = await reqFunction();
                    if (response.status === 204) {
                        setToggleDevice(false);
                    }
                } catch (error) {
                    console.log(error)
                }
            }

            requestTransfer();
        }
    };

    return (
        <Wrapper active={toggleDevice}>
            <button onClick={() => setToggleDevice(!toggleDevice)}>
                <DeviceIcon />
                {toggleDevice && (
                    <DeviceOptions>
                        <div className="text">
                            <h3>Connect to a device</h3>
                        </div>
                        <div className="banner">
                            <img src='https://open.scdn.co/cdn/images/connect_header@1x.ecc6912d.png' alt="devices-png" draggable="false" />
                        </div>
                        <div className="devices">
                            {devices && devices.length === 0 ? (<h3>No Device Available</h3>) : (
                                devices.map(items => (
                                    <div key={items.id} className="device_item" onClick={() => { switchDevice(items.id) }}>
                                        <div className="icon">
                                            {items.type === "Computer" ? <MonitorIcon /> : <SmartPhoneIcon />}
                                        </div>
                                        <div className="informations">
                                            <div className="name">
                                                <span style={{ color: items.is_active ? 'rgba(29, 185, 84, 0.9)' : 'rgba(255, 255, 255, 0.9)' }}>{items.is_active ? `Listening On` : `${items.name}`}</span>
                                            </div>
                                            <div className="device_status">
                                                <VolumeIcon volume={1} style={{ stroke: items.is_active ? 'rgba(29, 185, 84, 0.9)' : 'rgba(179, 179, 179, 0.8)' }} />
                                                <span style={{ color: items.is_active ? 'rgba(29, 185, 84, 0.9)' : 'rgba(179, 179, 179, 0.8)' }}>{items.is_active ? `${items.name}` : `Spotify Connect`}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </DeviceOptions>
                )}
            </button>
        </Wrapper>
    )
}
