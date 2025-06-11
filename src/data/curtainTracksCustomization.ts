import { CustomizationOption } from '../components/ProductCustomization';

// Import curtain tracks specific customization images
const installationInsideImg = new URL('../img/CURTAIN TRACKS/CUSTOMIZATION/1. Installation/inside the races.webp', import.meta.url).href;
const installationOutsideImg = new URL('../img/CURTAIN TRACKS/CUSTOMIZATION/1. Installation/outside the races.webp', import.meta.url).href;

const whiteTrackImg = new URL('../img/CURTAIN TRACKS/CUSTOMIZATION/2. Curtain color/White.webp', import.meta.url).href;
const blackTrackImg = new URL('../img/CURTAIN TRACKS/CUSTOMIZATION/2. Curtain color/Black.webp', import.meta.url).href;

const curtainBothMotorRightImg = new URL('../img/CURTAIN TRACKS/CUSTOMIZATION/3. CurtainMotor position/CurtainEachMotorRight.webp', import.meta.url).href;
const curtainBothMotorLeftImg = new URL('../img/CURTAIN TRACKS/CUSTOMIZATION/3. CurtainMotor position/CurtainEachMotorLeft.webp', import.meta.url).href;
const curtainMotorRightImg = new URL('../img/CURTAIN TRACKS/CUSTOMIZATION/3. CurtainMotor position/curtainMotorRight.webp', import.meta.url).href;
const curtainMotorLeftImg = new URL('../img/CURTAIN TRACKS/CUSTOMIZATION/3. CurtainMotor position/curtainMotorLeft.webp', import.meta.url).href;

const ceilingFittingImg = new URL('../img/CURTAIN TRACKS/CUSTOMIZATION/4.WallFitting/ceiling.webp', import.meta.url).href;
const wallFittingImg = new URL('../img/CURTAIN TRACKS/CUSTOMIZATION/4.WallFitting/wall.webp', import.meta.url).href;

const pleatedCurtainImg = new URL('../img/CURTAIN TRACKS/CUSTOMIZATION/5.CurtainType/Pleated.webp', import.meta.url).href;
const waveCurtainImg = new URL('../img/CURTAIN TRACKS/CUSTOMIZATION/5.CurtainType/Wave.webp', import.meta.url).href;

const bluetoothMotorImg = new URL('../img/CURTAIN TRACKS/CUSTOMIZATION/6.Motor type/motionblinds bluetooth motor, motor type.webp', import.meta.url).href;
const matterMotorImg = new URL('../img/CURTAIN TRACKS/CUSTOMIZATION/6.Motor type/eva motionblinds matter motor, motor type.webp', import.meta.url).href;

export const curtainTracksCustomization: CustomizationOption[] = [
 {
 id: 'installation',
 name: 'Installation',
 options: [
 {
 id: 'inside',
 name: 'Inside the recess',
 image: installationInsideImg,
 price: 0,
 },
 {
 id: 'outside',
 name: 'Outside the recess',
 image: installationOutsideImg,
 price: 0,
 },
 ],
 },
 {
 id: 'track_color',
 name: 'Curtain track color',
 options: [
 {
 id: 'white',
 name: 'White',
 image: whiteTrackImg,
 price: 0,
 },
 {
 id: 'black',
 name: 'Black',
 image: blackTrackImg,
 price: 0,
 },
 ],
 },
 {
 id: 'motor_position',
 name: 'Curtain and Motor position',
 options: [
 {
 id: 'both_sides_motor_right',
 name: 'Curtain each side and motor right',
 image: curtainBothMotorRightImg,
 price: 0,
 },
 {
 id: 'both_sides_motor_left',
 name: 'Curtain each side and motor left',
 image: curtainBothMotorLeftImg,
 price: 0,
 },
 {
 id: 'right_motor_left',
 name: 'Curtain and motor on right',
 image: curtainMotorRightImg,
 price: 0,
 },
 {
 id: 'left_motor_right',
 name: 'Curtain and motor on left',
 image: curtainMotorLeftImg,
 price: 0,
 },
 ],
 },
 {
 id: 'fitting_type',
 name: 'Wall or ceiling fitting',
 options: [
 {
 id: 'ceiling',
 name: 'Ceiling fitting',
 image: ceilingFittingImg,
 price: 0,
 },
 {
 id: 'wall',
 name: 'Wall fitting',
 image: wallFittingImg,
 price: 11.00,
 },
 ],
 },
 {
 id: 'curtain_type',
 name: 'Curtain type',
 options: [
 {
 id: 'pleated',
 name: 'Pleated curtain',
 image: pleatedCurtainImg,
 price: 0,
 },
 {
 id: 'wave',
 name: 'Wave curtain',
 image: waveCurtainImg,
 price: 0,
 },
 ],
 },
 {
 id: 'motor_type',
 name: 'Motor type',
 options: [
 {
 id: 'bluetooth',
 name: 'Motionblinds Bluetooth motor',
 image: bluetoothMotorImg,
 price: 0,
 },
 {
 id: 'matter',
 name: 'Eve Motionblinds Matter motor',
 image: matterMotorImg,
 price: 50.00,
 },
 ],
 info: 'If you choose a Matter motor then you will need a smart hub that supports Matter.'
 },
 {
 id: 'remote',
 name: 'Want to add a remote control to your order?',
 textOnly: true,
 options: [
 {
 id: 'none',
 name: 'No',
 price: 0,
 },
 {
 id: '5channel',
 name: '5-channel remote',
 price: 33.95,
 },
 {
 id: '15channel',
 name: '15-channel remote',
 price: 53.95,
 },
 ],
 },
]; 