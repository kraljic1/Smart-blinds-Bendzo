import { CustomizationOption } from '../components/ProductCustomization';

// Import images directly with require to handle spaces in filenames
const installationInsideImg = new URL('../img/Customization-types/inside the recess.webp', import.meta.url).href;
const installationOutsideImg = new URL('../img/Customization-types/outside the recess.webp', import.meta.url).href;
const bracketImg = new URL('../img/Customization-types/brackets, system type.webp', import.meta.url).href;
const cassetteImg = new URL('../img/Customization-types/cassette, system type.webp', import.meta.url).href;
const smallSizeImg = new URL('../img/Customization-types/small, system size.webp', import.meta.url).href;
const largeSizeImg = new URL('../img/Customization-types/large, system size.webp', import.meta.url).href;
const bluetoothMotorImg = new URL('../img/Customization-types/motionblinds bluetooth motor, motor type.webp', import.meta.url).href;
const matterMotorImg = new URL('../img/Customization-types/eva motionblinds matter motor, motor type.webp', import.meta.url).href;
const metalBottomBarImg = new URL('../img/Customization-types/metal, bottom bar.webp', import.meta.url).href;
const straightCoveredBottomBarImg = new URL('../img/Customization-types/straight covered, bottom bar.webp', import.meta.url).href;
const straightSewnBottomBarImg = new URL('../img/Customization-types/straight sewn, bottom bar.webp', import.meta.url).href;

export const defaultCustomizationOptions: CustomizationOption[] = [
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
 id: 'transparency',
 name: 'Transparency',
 textOnly: true,
 options: [
 {
 id: 'light',
 name: 'Light filtering',
 price: 0,
 },
 {
 id: 'blackout',
 name: 'Blackout',
 price: 15.00,
 },
 ],
 },
 {
 id: 'color',
 name: 'Color',
 options: [
 {
 id: 'off-white',
 name: 'Off-White',
 color: '#e9e9e7',
 price: 0,
 },
 {
 id: 'white',
 name: 'White',
 color: '#f9f9f7',
 price: 0,
 },
 {
 id: 'light-gray',
 name: 'Light Gray',
 color: '#d4d4d4',
 price: 0,
 },
 {
 id: 'blue-gray',
 name: 'Blue Gray',
 color: '#d1d5df',
 price: 0,
 },
 {
 id: 'gray',
 name: 'Gray',
 color: '#b8b8b8',
 price: 0,
 },
 {
 id: 'navy',
 name: 'Navy',
 color: '#404659',
 price: 0,
 },
 {
 id: 'mid-gray',
 name: 'Mid Gray',
 color: '#8f8f8f',
 price: 0,
 },
 {
 id: 'charcoal',
 name: 'Charcoal',
 color: '#373e4d',
 price: 0,
 },
 {
 id: 'beige',
 name: 'Beige',
 color: '#d9cfc1',
 price: 0,
 },
 ],
 },
 {
 id: 'system',
 name: 'System Type',
 options: [
 {
 id: 'brackets',
 name: 'Brackets',
 image: bracketImg,
 price: 0,
 },
 {
 id: 'cassette',
 name: 'Cassette',
 image: cassetteImg,
 price: 25.00,
 },
 ],
 },
 {
 id: 'size',
 name: 'System Size',
 options: [
 {
 id: 'small',
 name: 'Small',
 image: smallSizeImg,
 price: 0,
 },
 {
 id: 'large',
 name: 'Large',
 image: largeSizeImg,
 price: 35.00,
 },
 ],
 },
 {
 id: 'motor_type',
 name: 'Motor Type',
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
 },
 {
 id: 'motor_side',
 name: 'Motor Side',
 textOnly: true,
 options: [
 {
 id: 'links',
 name: 'Left',
 price: 0,
 },
 {
 id: 'rechts',
 name: 'Right',
 price: 0,
 },
 ],
 },
 {
 id: 'bottom_bar',
 name: 'Bottom Bar',
 options: [
 {
 id: 'metal',
 name: 'Metal',
 image: metalBottomBarImg,
 price: 0,
 },
 {
 id: 'straight_covered',
 name: 'Straight Covered',
 image: straightCoveredBottomBarImg,
 price: 10.00,
 },
 {
 id: 'straight_sewn',
 name: 'Straight Sewn',
 image: straightSewnBottomBarImg,
 price: 15.00,
 },
 ],
 },
 {
 id: 'remote',
 name: 'Would you like to add a remote control to your Smartblinds?',
 textOnly: true,
 options: [
 {
 id: 'none',
 name: 'No',
 price: 0,
 },
 {
 id: '5channel',
 name: '5-channel',
 price: 45.00,
 },
 {
 id: '15channel',
 name: '15-channel',
 price: 65.00,
 },
 ],
 },
]; 