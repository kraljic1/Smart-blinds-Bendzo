export interface Testimonial {
 name: string;
 role: string;
 content: string;
 rating: number;
 company?: string;
 location?: string;
 avatar?: string; // Optional avatar URL
}

export const testimonials: Testimonial[] = [
 {
 name:"Sarah Johnson",
 role:"Homeowner",
 content:"The smart blinds have completely transformed our home. The automation is seamless and the energy savings are real!",
 rating: 5,
 location:"New York"
 },
 {
 name:"Michael Chen",
 role:"Tech Enthusiast",
 content:"Integration with my smart home setup was a breeze. The app is intuitive and the blinds work flawlessly.",
 rating: 5,
 location:"San Francisco"
 },
 {
 name:"Emma Davis",
 role:"Interior Designer",
 content:"I recommend these to all my clients. The quality and style options are exceptional.",
 rating: 5,
 company:"Modern Design Co."
 },
 {
 name:"Robert Wilson",
 role:"Smart Home Consultant",
 content:"These are the most reliable smart blinds I've tested. Battery life is excellent and the connection never drops.",
 rating: 5,
 company:"Smart Living Solutions"
 },
 {
 name:"Jennifer Lopez",
 role:"Architect",
 content:"The minimal design and variety of fabrics make these blinds perfect for modern architectural projects.",
 rating: 4,
 company:"Urban Spaces"
 },
 {
 name:"Thomas Brown",
 role:"Homeowner",
 content:"We installed these in our bedroom and the blackout option is incredible. The scheduling feature helps us wake up naturally with the sun.",
 rating: 5,
 location:"Chicago"
 },
 {
 name:"Sophia Martinez",
 role:"Energy Efficiency Consultant",
 content:"My clients have reported up to 15% energy savings after installing these smart blinds. The insulation properties are outstanding.",
 rating: 5,
 company:"GreenHome Consulting"
 },
 {
 name:"David Park",
 role:"Property Manager",
 content:"We've equipped all our luxury rentals with these blinds. Tenants love them and they're extremely low maintenance.",
 rating: 4,
 company:"Elite Properties"
 },
 {
 name:"Laura Schmidt",
 role:"Parent",
 content:"The cordless design makes these blinds so much safer for our kids. The voice control is an added bonus!",
 rating: 5,
 location:"Boston"
 },
 {
 name:"James Wilson",
 role:"Retiree",
 content:"At my age, it's nice to control the blinds without getting up. The remote and app are simple to use, even for someone not tech-savvy.",
 rating: 5,
 location:"Miami"
 },
 {
 name:"Olivia Taylor",
 role:"Homeowner",
 content:"The customer service was exceptional - they helped me measure and choose the perfect blinds for each room. Installation was quick and clean.",
 rating: 5,
 location:"Austin"
 },
 {
 name:"Daniel Garcia",
 role:"Smart Home Enthusiast",
 content:"These blinds work perfectly with my existing smart home system. The API integration is solid and reliable.",
 rating: 4,
 location:"Seattle"
 },
 {
 name:"Natalie Wong",
 role:"Interior Stylist",
 content:"The fabric quality and color accuracy exceeded my expectations. My clients are always impressed with how these elevate their spaces.",
 rating: 5,
 company:"Styled Spaces"
 }
]; 