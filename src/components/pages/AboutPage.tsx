import React from 'react';
import { 
  Users, Award, TrendingUp, Heart, Shield, Star, 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AboutPage: React.FC = () => {
  const navigate = useNavigate();

  const values = [
    {
      title: 'Integrity',
      description: 'We conduct business with the highest ethical standards and transparent practices.',
      icon: Shield,
    },
    {
      title: 'Excellence',
      description: 'We strive for excellence in every interaction and transaction with our clients.',
      icon: Award,
    },
    {
      title: 'Innovation',
      description: 'We embrace technology and innovative solutions to enhance our services.',
      icon: TrendingUp,
    },
    {
      title: 'Client-Focused',
      description: 'Our clients\' needs and satisfaction are at the center of everything we do.',
      icon: Heart,
    },
  ];

  const teamMembers = [
    {
      name: 'Sarah Johnson',
      position: 'CEO & Founder',
      experience: '15+ years',
      description: 'Sarah founded PropertyHub with a vision to revolutionize the real estate experience. Her leadership has guided the company to become a trusted name in the industry.',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400&h=400',
      specialties: ['Strategic Planning', 'Team Leadership', 'Market Analysis'],
    },
    {
      name: 'Michael Chen',
      position: 'Chief Operating Officer',
      experience: '12+ years',
      description: 'Michael ensures smooth operations and exceptional service delivery across all our departments. His expertise in process optimization drives our efficiency.',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400&h=400',
      specialties: ['Operations Management', 'Process Optimization', 'Quality Control'],
    },
    {
      name: 'Emily Rodriguez',
      position: 'Head of Sales',
      experience: '10+ years',
      description: 'Emily leads our sales team with passion and expertise. Her deep understanding of market dynamics helps clients make informed decisions.',
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400&h=400',
      specialties: ['Sales Strategy', 'Client Relations', 'Market Research'],
    },
    {
      name: 'James Wilson',
      position: 'Lead Investment Advisor',
      experience: '14+ years',
      description: 'James specializes in real estate investment strategies and helps clients build profitable property portfolios with calculated risk management.',
      image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400&h=400',
      specialties: ['Investment Analysis', 'Portfolio Management', 'Risk Assessment'],
    },
  ];

  const milestones = [
    { year: '2009', event: 'PropertyHub founded with a small team of 3 professionals' },
    { year: '2012', event: 'Reached 500 successful property transactions milestone' },
    { year: '2015', event: 'Expanded operations to cover 5 major cities' },
    { year: '2018', event: 'Launched digital platform and mobile app' },
    { year: '2020', event: 'Achieved 2000+ satisfied clients and opened 10 branch offices' },
    { year: '2023', event: 'Introduced AI-powered property matching and virtual tours' },
  ];

  const stats = [
    { label: 'Properties Sold', value: '2,847', icon: TrendingUp },
    { label: 'Happy Clients', value: '1,963', icon: Users },
    { label: 'Years Experience', value: '15+', icon: Award },
    { label: 'Expert Agents', value: '124', icon: Star },
  ];

  const awards = [
    'Best Real Estate Agency 2023',
    'Excellence in Customer Service Award',
    'Top Property Investment Advisor',
    'Digital Innovation in Real Estate',
    'Sustainable Business Practices Award',
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-teal-800 text-white py-20">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1920&h=800"
            alt="About PropertyHub"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            About <span className="text-teal-300">PropertyHub</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
            Your trusted partner in real estate for over 15 years. We combine expertise, 
            innovation, and personalized service to help you achieve your property dreams.
          </p>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Founded in 2009 by Sarah Johnson, PropertyHub began as a small real estate firm 
                  with a simple mission: to make property transactions transparent, efficient, and 
                  stress-free for everyone involved.
                </p>
                <p>
                  What started as a three-person team has grown into a comprehensive real estate 
                  platform serving thousands of clients across multiple cities. Our journey has 
                  been marked by continuous innovation, unwavering commitment to client satisfaction, 
                  and a deep understanding of market dynamics.
                </p>
                <p>
                  Today, PropertyHub stands as a testament to the power of combining traditional 
                  real estate expertise with cutting-edge technology. We've facilitated over 2,800 
                  property transactions and helped countless families find their dream homes.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800&h=600"
                alt="PropertyHub office"
                className="w-full rounded-lg shadow-lg"
              />
              <div className="absolute -bottom-6 -right-6 bg-blue-600 text-white p-6 rounded-lg shadow-lg">
                <div className="text-3xl font-bold">15+</div>
                <div className="text-sm">Years of Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-700 leading-relaxed">
                To provide exceptional real estate services that exceed client expectations while 
                fostering long-term relationships built on trust, integrity, and results. We strive 
                to make every property transaction a positive and memorable experience.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-700 leading-relaxed">
                To be the most trusted and innovative real estate platform, recognized for our 
                commitment to excellence, technological advancement, and positive impact on 
                communities. We envision a future where finding the perfect property is seamless and enjoyable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These fundamental principles guide every decision we make and every service we provide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="text-center p-6 bg-gray-50 rounded-lg hover:shadow-md transition-shadow duration-300">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Achievements</h2>
            <p className="text-xl opacity-90">Numbers that reflect our commitment to excellence</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <Icon className="h-12 w-12 mx-auto mb-4 text-teal-300" />
                  <div className="text-4xl font-bold mb-2">{stat.value}</div>
                  <div className="text-blue-100">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Leadership Team</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our experienced leadership team combines decades of real estate expertise 
              with innovative thinking to drive our success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-start space-x-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                    <p className="text-blue-600 font-semibold mb-1">{member.position}</p>
                    <p className="text-sm text-gray-600 mb-3">{member.experience}</p>
                    <p className="text-gray-700 text-sm mb-3">{member.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {member.specialties.map((specialty, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-lg text-gray-600">Key milestones in our company's growth and evolution</p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-200"></div>
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`flex items-center ${
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  }`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-white p-4 rounded-lg shadow-md">
                      <div className="text-blue-600 font-bold text-lg mb-1">{milestone.year}</div>
                      <div className="text-gray-700">{milestone.event}</div>
                    </div>
                  </div>
                  <div className="relative z-10 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-md"></div>
                  <div className="flex-1"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Awards & Recognition</h2>
            <p className="text-lg text-gray-600">
              We're proud to be recognized for our excellence and innovation in the real estate industry
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {awards.map((award, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center">
                <Award className="h-12 w-12 text-yellow-500 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900">{award}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Work with Us?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of satisfied clients who have trusted us with their real estate needs.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button
              onClick={() => navigate('/contact')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              Get in Touch
            </button>
            <button
              onClick={() => navigate('/properties')}
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              View Properties
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;