import 'dotenv/config'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const categoryNames = ['Surveillance, Security & Access Control', 'Entrance Cum Road Safety Solutions', 'Scanning, Screening & Power Solutions', 'Logistics & Material Handling', 'Insulated Ice / Vaccine Boxes & Freezers', 'Waste Management Solutions', 'Office Cum Home Solutions', 'Industrial Storage Solutions']
const clients = ['The Park Classic, Jaipur', 'IBIS Hotels', 'Samode Hotels, Jaipur', 'ITC Rajputana, Jaipur', 'APEX Hospitals, Jaipur', 'Khandaka Jain Jewellers', 'Jaipur Haat', 'Tordi Haveli Hotel', 'Hero Swift Showroom', 'OYO Rooms', 'HPCL Petroleum Pumps', 'VIVO']
const schema = new mongoose.Schema({ name: String, slug: String, description: String, order: Number, active: Boolean })
const Category = mongoose.model('Category', schema)
const Client = mongoose.model('Client', new mongoose.Schema({ name: String, industry: String, featured: Boolean, active: Boolean }))
const User = mongoose.model('User', new mongoose.Schema({ 
  name: String, 
  email: { type: String, unique: true }, 
  password: String, 
  role: { type: String, enum: ['customer', 'admin'], default: 'customer' },
  isActive: { type: Boolean, default: true }
}))
if (!process.env.MONGO_URI) throw new Error('MONGO_URI is required to seed')
await mongoose.connect(process.env.MONGO_URI)
await Category.deleteMany({}); await Client.deleteMany({})
await Category.insertMany(categoryNames.map((name, i) => ({ name, slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'), description: 'Integrated products and support for professional environments.', order: i + 1, active: true })))
await Client.insertMany(clients.map((name, i) => ({ name, industry: i % 3 === 0 ? 'Hospitality' : 'Enterprise', featured: i < 8, active: true })))
const password = await bcrypt.hash('ChangeMe@123', 12)
await User.findOneAndUpdate({ email: 'admin@isysinformatics.com' }, { name: 'Admin User', email: 'admin@isysinformatics.com', password, role: 'admin', isActive: true }, { upsert: true, new: true })
console.log('Seed complete. Admin: admin@isysinformatics.com / ChangeMe@123')
await mongoose.disconnect()
