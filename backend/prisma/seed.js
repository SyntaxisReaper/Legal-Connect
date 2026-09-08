const { PrismaClient } = require('./generated/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database with extensive mock data...');

  // Clean existing data
  await prisma.appointment.deleteMany({});
  await prisma.review.deleteMany({});
  await prisma.lawyerProfile.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.legalDomain.deleteMany({});

  const passwordHash = await bcrypt.hash('password123', 10);

  // Domains
  const corporateDomain = await prisma.legalDomain.create({ data: { name: 'Corporate Law', description: 'Business formation, M&A, contracts, and corporate defense.' } });
  const familyDomain = await prisma.legalDomain.create({ data: { name: 'Family Law', description: 'Divorce, child custody, alimony, and adoption matters.' } });
  const criminalDomain = await prisma.legalDomain.create({ data: { name: 'Criminal Defense', description: 'Defense against misdemeanors and felony charges.' } });
  const realEstateDomain = await prisma.legalDomain.create({ data: { name: 'Real Estate', description: 'Property disputes, leasing, zoning, and closings.' } });
  const civilDomain = await prisma.legalDomain.create({ data: { name: 'Civil Litigation', description: 'Lawsuits, personal injury, and non-criminal disputes.' } });
  const ipDomain = await prisma.legalDomain.create({ data: { name: 'Intellectual Property', description: 'Patents, trademarks, copyrights, and trade secrets.' } });

  const domains = [corporateDomain, familyDomain, criminalDomain, realEstateDomain, civilDomain, ipDomain];

  // Admin
  await prisma.user.create({
    data: { name: 'Super Admin', email: 'admin@example.com', passwordHash, role: 'ADMIN' }
  });

  // Clients
  const clients = [];
  const clientNames = [
    'John Doe', 'Jane Smith', 'Michael Johnson', 'Emily Davis', 'William Brown',
    'Olivia Taylor', 'James Wilson', 'Sophia Anderson', 'Benjamin Thomas', 'Isabella Jackson'
  ];
  for (let i = 0; i < clientNames.length; i++) {
    const client = await prisma.user.create({
      data: {
        name: clientNames[i],
        email: `client${i + 1}@example.com`,
        passwordHash,
        role: 'CLIENT'
      }
    });
    clients.push(client);
  }

  // Lawyers
  const lawyers = [];
  const lawyerData = [
    { name: 'Harvey Specter', domain: corporateDomain, specialties: 'M&A, Corporate Defense', exp: 15, fee: 500, verified: true, location: 'New York, NY', languages: 'English', education: 'Harvard Law School', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80' },
    { name: 'Louis Litt', domain: corporateDomain, specialties: 'Financial Fraud, Tax Law', exp: 14, fee: 450, verified: true, location: 'New York, NY', languages: 'English', education: 'Harvard Law School', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80' },
    { name: 'Alicia Florrick', domain: familyDomain, specialties: 'Divorce, Custody', exp: 10, fee: 250, verified: true, location: 'Chicago, IL', languages: 'English, Spanish', education: 'Georgetown University', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80' },
    { name: 'Diane Lockhart', domain: civilDomain, specialties: 'Class Action, Civil Rights', exp: 25, fee: 600, verified: true, location: 'Chicago, IL', languages: 'English, French', education: 'Yale Law School', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80' },
    { name: 'Saul Goodman', domain: criminalDomain, specialties: 'Criminal Defense, Liability', exp: 20, fee: 150, verified: true, location: 'Albuquerque, NM', languages: 'English, Spanish', education: 'University of American Samoa', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80' },
    { name: 'Kim Wexler', domain: corporateDomain, specialties: 'Banking, Regulatory', exp: 12, fee: 350, verified: true, location: 'Albuquerque, NM', languages: 'English', education: 'University of New Mexico', img: 'https://images.unsplash.com/photo-1598550874175-4d0ef436c909?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80' },
    { name: 'Jessica Pearson', domain: realEstateDomain, specialties: 'Commercial Real Estate, Zoning', exp: 25, fee: 600, verified: true, location: 'New York, NY', languages: 'English', education: 'Harvard Law School', img: 'https://images.unsplash.com/photo-1531123897727-8f129e1bf98c?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80' },
    { name: 'Alan Shore', domain: civilDomain, specialties: 'Civil Rights, Personal Injury', exp: 18, fee: 400, verified: true, location: 'Boston, MA', languages: 'English', education: 'Suffolk University', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80' },
    { name: 'Denny Crane', domain: civilDomain, specialties: 'Litigation, Defamation', exp: 40, fee: 800, verified: true, location: 'Boston, MA', languages: 'English', education: 'Harvard Law School', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80' },
    { name: 'Elle Woods', domain: ipDomain, specialties: 'Patents, Trademarks', exp: 8, fee: 300, verified: true, location: 'Los Angeles, CA', languages: 'English, French', education: 'Harvard Law School', img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80' },
    { name: 'Jack McCoy', domain: criminalDomain, specialties: 'Prosecution, Defense', exp: 30, fee: 500, verified: true, location: 'New York, NY', languages: 'English', education: 'New York University', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80' },
    { name: 'Annalise Keating', domain: criminalDomain, specialties: 'Murder, High-Profile Defense', exp: 22, fee: 750, verified: true, location: 'Philadelphia, PA', languages: 'English', education: 'Harvard Law School', img: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80' },
    { name: 'Marshall Eriksen', domain: realEstateDomain, specialties: 'Environmental Law, Property', exp: 5, fee: 200, verified: true, location: 'New York, NY', languages: 'English, Italian', education: 'Columbia Law School', img: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80' },
    // Unverified Lawyers
    { name: 'Mike Ross', domain: corporateDomain, specialties: 'General Practice', exp: 2, fee: 50, verified: false, location: 'New York, NY', languages: 'English', education: 'Self-Taught', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80' },
    { name: 'Jimmy McGill', domain: familyDomain, specialties: 'Elder Law', exp: 3, fee: 100, verified: false, location: 'Albuquerque, NM', languages: 'English', education: 'University of American Samoa', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80' },
    { name: 'Rachel Zane', domain: civilDomain, specialties: 'Paralegal turned Lawyer', exp: 1, fee: 75, verified: false, location: 'New York, NY', languages: 'English, Spanish', education: 'Columbia Law School', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80' }
  ];

  for (let i = 0; i < lawyerData.length; i++) {
    const lData = lawyerData[i];
    const user = await prisma.user.create({
      data: {
        name: lData.name,
        email: `lawyer${i + 1}@example.com`,
        passwordHash,
        role: 'LAWYER'
      }
    });
    
    const profile = await prisma.lawyerProfile.create({
      data: {
        userId: user.id,
        bio: `${lData.name} is a highly experienced legal professional specializing in ${lData.specialties}. Dedicated to providing the best legal counsel.`,
        experienceYears: lData.exp,
        consultationFee: lData.fee,
        barRegistrationNumber: `BAR-${Math.floor(10000 + Math.random() * 90000)}`,
        isVerified: lData.verified,
        specialties: lData.specialties,
        location: lData.location,
        languages: lData.languages,
        education: lData.education,
        imageUrl: lData.img,
        domains: { create: [{ domainId: lData.domain.id }] }
      }
    });
    
    lawyers.push({ user, profile });
  }

  // Appointments
  const statuses = ['PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED'];
  const notesList = [
    'Need help reviewing a commercial lease.',
    'Seeking advice on child custody modifications.',
    'Got a speeding ticket and need representation.',
    'Want to trademark my new startup logo.',
    'Need a non-disclosure agreement drafted.',
    'Discussing settlement options for personal injury.'
  ];

  for (let i = 0; i < 25; i++) {
    const client = clients[Math.floor(Math.random() * clients.length)];
    const lawyer = lawyers[Math.floor(Math.random() * lawyers.length)].user;
    
    // Mix of past and future dates
    const date = new Date();
    date.setDate(date.getDate() + (Math.floor(Math.random() * 20) - 10)); // -10 to +10 days
    date.setHours(Math.floor(Math.random() * 8) + 9, 0, 0, 0); // 9 AM to 5 PM
    
    let status = statuses[Math.floor(Math.random() * statuses.length)];
    
    // Make sure past appointments are mostly COMPLETED or CANCELLED
    if (date < new Date() && status === 'PENDING') {
      status = 'COMPLETED';
    }

    await prisma.appointment.create({
      data: {
        clientId: client.id,
        lawyerId: lawyer.id,
        scheduledAt: date,
        status: status,
        notes: notesList[Math.floor(Math.random() * notesList.length)]
      }
    });
  }

  console.log('Extensive mock data seeded successfully!');
  console.log('--- Test Accounts (password: password123) ---');
  console.log('Admin: admin@example.com');
  console.log('Client: client1@example.com');
  console.log('Lawyer: lawyer1@example.com');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
