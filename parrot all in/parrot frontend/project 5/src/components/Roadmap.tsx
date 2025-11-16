import React from 'react';
import { CheckCircle, Circle, Clock, Rocket, Users, Zap, Globe, Coins, Palette, Vote } from 'lucide-react';

const Roadmap = () => {
  const roadmapPhases = [
    {
      phase: 'Phase 1',
      title: 'Presale Launch & Community Building',
      description: 'Launch presale campaign, build strong community foundation, and establish social media presence.',
      status: 'completed',
      icon: Rocket,
      items: [
        'Website Launch & Smart Contract Deployment',
        'Multi-stage Presale Platform Setup',
        'Community Building (Twitter, Telegram, Discord)',
        'Influencer Partnerships & Marketing Campaign'
      ]
    },
    {
      phase: 'Phase 2',
      title: 'DEX Launch & Liquidity Addition',
      description: 'List on major decentralized exchanges and establish strong liquidity pools.',
      status: 'current',
      icon: Zap,
      items: [
        'Uniswap & PancakeSwap Listings',
        'Liquidity Pool Creation & Locking',
        'CoinGecko & CoinMarketCap Listings',
        'Price Discovery & Trading Volume Growth'
      ]
    },
    {
      phase: 'Phase 3',
      title: 'Marketing Blitz & Partnerships',
      description: 'Aggressive marketing campaign and strategic partnerships to increase adoption.',
      status: 'upcoming',
      icon: Users,
      items: [
        'Major Influencer Collaborations',
        'YouTube & TikTok Marketing Campaigns',
        'Twitter Spaces & AMA Sessions',
        'Strategic Partnership Announcements'
      ]
    },
    {
      phase: 'Phase 4',
      title: 'Layer 2 Mainnet Launch',
      description: 'Deploy our own Layer 2 blockchain solution with advanced features.',
      status: 'upcoming',
      icon: Globe,
      items: [
        'Layer 2 Mainnet Deployment',
        'Cross-chain Bridge Implementation',
        'EVM Compatibility Testing',
        'Developer Tools & Documentation'
      ]
    },
    {
      phase: 'Phase 5',
      title: 'NFT Marketplace & DAO Governance',
      description: 'Launch NFT marketplace and implement decentralized governance system.',
      status: 'upcoming',
      icon: Palette,
      items: [
        'NFT Marketplace Launch',
        'Parrot-themed NFT Collections',
        'DAO Governance Implementation',
        'Community Voting Platform'
      ]
    },
    {
      phase: 'Phase 6',
      title: 'Global Expansion & Partnerships',
      description: 'Major exchange listings, global partnerships, and ecosystem expansion.',
      status: 'upcoming',
      icon: Coins,
      items: [
        'Tier 1 CEX Listings (Binance, Coinbase)',
        'Mobile App Development',
        'Staking Platform Launch',
        'Global Marketing & Expansion'
      ]
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="text-green-500" size={24} />;
      case 'current':
        return <Clock className="text-blue-500" size={24} />;
      default:
        return <Circle className="text-gray-400" size={24} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'border-green-300 bg-green-50';
      case 'current':
        return 'border-blue-300 bg-blue-50';
      default:
        return 'border-gray-300 bg-gray-50';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500 text-white';
      case 'current':
        return 'bg-blue-500 text-white animate-pulse';
      default:
        return 'bg-gray-400 text-white';
    }
  };

  return (
    <section id="roadmap" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-6">
            Roadmap to Success
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Our journey to revolutionize the meme token space with clear milestones, innovative features, and community-driven growth.
          </p>
        </div>

        {/* Decorative parrot footprints */}
        <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 opacity-10">
          <div className="space-y-20">
            {roadmapPhases.map((_, index) => (
              <div key={index} className="text-4xl">🦶</div>
            ))}
          </div>
        </div>

        <div className="space-y-12 relative">
          {roadmapPhases.map((phase, index) => {
            const IconComponent = phase.icon;
            return (
              <div key={index} className="relative">
                {/* Connection Line */}
                {index < roadmapPhases.length - 1 && (
                  <div className="absolute left-12 top-32 w-1 h-20 bg-gradient-to-b from-green-300 to-blue-300 opacity-50 hidden lg:block"></div>
                )}
                
                <div className={`flex items-start space-x-8 p-8 rounded-3xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-xl ${getStatusColor(phase.status)}`}>
                  {/* Phase Icon */}
                  <div className="flex-shrink-0">
                    <div className={`w-20 h-20 rounded-full border-4 flex items-center justify-center shadow-lg ${
                      phase.status === 'completed' 
                        ? 'border-green-400 bg-green-100' 
                        : phase.status === 'current'
                        ? 'border-blue-400 bg-blue-100'
                        : 'border-gray-400 bg-gray-100'
                    }`}>
                      <IconComponent className={
                        phase.status === 'completed' 
                          ? 'text-green-600' 
                          : phase.status === 'current'
                          ? 'text-blue-600'
                          : 'text-gray-600'
                      } size={32} />
                    </div>
                  </div>

                  <div className="flex-grow">
                    {/* Phase Header */}
                    <div className="mb-6">
                      <div className="flex items-center space-x-4 mb-3">
                        <h3 className="text-2xl font-bold text-gray-800">{phase.phase}</h3>
                        <span className={`px-4 py-2 rounded-full text-sm font-bold ${getStatusBadge(phase.status)}`}>
                          {phase.status === 'completed' ? 'COMPLETED ✓' : phase.status === 'current' ? 'IN PROGRESS' : 'UPCOMING'}
                        </span>
                      </div>
                      <h4 className="text-xl font-bold text-gray-800 mb-3">{phase.title}</h4>
                      <p className="text-gray-600 text-lg">{phase.description}</p>
                    </div>

                    {/* Phase Items */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {phase.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200">
                          {getStatusIcon(phase.status)}
                          <span className={`font-medium ${
                            phase.status === 'completed' 
                              ? 'text-green-700' 
                              : phase.status === 'current'
                              ? 'text-blue-700'
                              : 'text-gray-600'
                          }`}>
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-3xl p-12 text-white">
            <div className="text-6xl mb-6">🚀🦜</div>
            <h3 className="text-3xl font-bold mb-6">Ready to Join the Flock?</h3>
            <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Don't miss your chance to be part of the TOKEN PARROT revolution. Join thousands of holders who are already spreading their wings in the crypto jungle!
            </p>
            <button className="bg-white text-green-600 hover:text-green-700 px-12 py-4 rounded-full font-bold text-xl transition-all duration-300 transform hover:scale-105 shadow-lg">
              Buy $PARROT Now 🦜
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Roadmap;