import { ShoppingCart, Search, Menu, Cpu, Monitor, Headphones, Keyboard, MousePointer, Zap, Star, X, Plus, Minus, Check } from 'lucide-react';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { toast, Toaster } from 'sonner';

export default function App() {
  const [cartItems, setCartItems] = useState<Array<{ id: number; name: string; price: string; quantity: number; image: string }>>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showAllProducts, setShowAllProducts] = useState(false);

  // Helper Functions
  const addToCart = (product: { id: number; name: string; price: string; image: string }) => {
    const existingItem = cartItems.find(item => item.id === product.id);

    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
      toast.success(`Added another ${product.name} to cart!`);
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
      toast.success(`${product.name} added to cart!`);
    }
  };

  const removeFromCart = (productId: number) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
    toast.success('Item removed from cart');
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems(cartItems.map(item =>
      item.id === productId
        ? { ...item, quantity: newQuantity }
        : item
    ));
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.price.replace('$', '').replace(',', ''));
      return total + (price * item.quantity);
    }, 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const categories = [
    { icon: Cpu, name: 'GPUs & Processors', gradient: 'from-cyan-500 to-blue-500', category: 'gpu' },
    { icon: Monitor, name: 'Monitors', gradient: 'from-purple-500 to-pink-500', category: 'monitor' },
    { icon: Keyboard, name: 'Keyboards', gradient: 'from-green-500 to-cyan-500', category: 'keyboard' },
    { icon: MousePointer, name: 'Gaming Mice', gradient: 'from-pink-500 to-red-500', category: 'mouse' },
    { icon: Headphones, name: 'Audio', gradient: 'from-blue-500 to-purple-500', category: 'audio' },
    { icon: Zap, name: 'Accessories', gradient: 'from-yellow-500 to-orange-500', category: 'accessories' },
  ];

  const allProducts = [
    {
      id: 1,
      name: 'RTX 4090 Graphics Card',
      price: '$1,599',
      rating: 4.9,
      reviews: 2847,
      image: 'https://images.unsplash.com/photo-1658673847785-08f1738116f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFwaGljcyUyMGNhcmQlMjBHUFV8ZW58MXx8fHwxNzc2NDUyMTU2fDA&ixlib=rb-4.1.0&q=80&w=1080',
      badge: 'BEST SELLER',
      gradient: 'from-cyan-500/20 to-blue-500/20',
      category: 'gpu'
    },
    {
      id: 2,
      name: 'RGB Mechanical Keyboard',
      price: '$189',
      rating: 4.8,
      reviews: 1523,
      image: 'https://images.unsplash.com/photo-1649899913123-90bb33c8a66a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWNoYW5pY2FsJTIwa2V5Ym9hcmQlMjBSR0J8ZW58MXx8fHwxNzc2NDUyMTU1fDA&ixlib=rb-4.1.0&q=80&w=1080',
      badge: 'NEW',
      gradient: 'from-purple-500/20 to-pink-500/20',
      category: 'keyboard'
    },
    {
      id: 3,
      name: 'Pro Gaming Mouse',
      price: '$79',
      rating: 4.7,
      reviews: 3421,
      image: 'https://images.unsplash.com/photo-1628832307345-7404b47f1751?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBtb3VzZXxlbnwxfHx8fDE3NzY0NTIxNTV8MA&ixlib=rb-4.1.0&q=80&w=1080',
      badge: 'POPULAR',
      gradient: 'from-pink-500/20 to-red-500/20',
      category: 'mouse'
    },
    {
      id: 4,
      name: 'Premium RGB Setup',
      price: '$349',
      rating: 5.0,
      reviews: 892,
      image: 'https://images.unsplash.com/photo-1682335008739-eddc8bd8f57b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxnYW1pbmclMjBjb21wdXRlciUyMFJHQiUyMHNldHVwfGVufDF8fHx8MTc3NjQ1MjE1NXww&ixlib=rb-4.1.0&q=80&w=1080',
      badge: 'PREMIUM',
      gradient: 'from-green-500/20 to-cyan-500/20',
      category: 'accessories'
    },
    {
      id: 5,
      name: 'Gaming Headset Pro',
      price: '$159',
      rating: 4.6,
      reviews: 1876,
      image: 'https://images.unsplash.com/photo-1648241776507-7e3ae32698e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxnYW1pbmclMjBjb21wdXRlciUyMFJHQiUyMHNldHVwfGVufDF8fHx8MTc3NjQ1MjE1NXww&ixlib=rb-4.1.0&q=80&w=1080',
      badge: 'TRENDING',
      gradient: 'from-blue-500/20 to-purple-500/20',
      category: 'audio'
    },
    {
      id: 6,
      name: 'RGB PC Case',
      price: '$249',
      rating: 4.8,
      reviews: 2134,
      image: 'https://images.unsplash.com/photo-1738245494097-9b1e3971c3eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxMHx8Z2FtaW5nJTIwY29tcHV0ZXIlMjBSR0IlMjBzZXR1cHxlbnwxfHx8fDE3NzY0NTIxNTV8MA&ixlib=rb-4.1.0&q=80&w=1080',
      badge: 'HOT',
      gradient: 'from-yellow-500/20 to-orange-500/20',
      category: 'accessories'
    },
    {
      id: 7,
      name: '4K Gaming Monitor',
      price: '$699',
      rating: 4.9,
      reviews: 1654,
      image: 'https://images.unsplash.com/photo-1616093700899-dddbfc0fe7d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw3fHxnYW1pbmclMjBjb21wdXRlciUyMFJHQiUyMHNldHVwfGVufDF8fHx8MTc3NjQ1MjE1NXww&ixlib=rb-4.1.0&q=80&w=1080',
      badge: 'TOP RATED',
      gradient: 'from-purple-500/20 to-pink-500/20',
      category: 'monitor'
    },
    {
      id: 8,
      name: 'Intel Core i9 Processor',
      price: '$589',
      rating: 4.8,
      reviews: 2198,
      image: 'https://images.unsplash.com/photo-1729357671906-875e1bc2f0bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw5fHxnYW1pbmclMjBjb21wdXRlciUyMFJHQiUyMHNldHVwfGVufDF8fHx8MTc3NjQ1MjE1NXww&ixlib=rb-4.1.0&q=80&w=1080',
      badge: 'POWERFUL',
      gradient: 'from-cyan-500/20 to-blue-500/20',
      category: 'gpu'
    },
    {
      id: 9,
      name: 'Wireless Gaming Mouse',
      price: '$129',
      rating: 4.5,
      reviews: 987,
      image: 'https://images.unsplash.com/photo-1613141412501-9012977f1969?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxnYW1pbmclMjBtb3VzZXxlbnwxfHx8fDE3NzY0NTIxNTV8MA&ixlib=rb-4.1.0&q=80&w=1080',
      badge: 'WIRELESS',
      gradient: 'from-pink-500/20 to-red-500/20',
      category: 'mouse'
    },
  ];

  // Filter products based on search and category
  const filteredProducts = allProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const displayedProducts = showAllProducts ? filteredProducts : filteredProducts.slice(0, 6);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: 'rgba(19, 19, 24, 0.95)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            color: '#e8e8f0',
            backdropFilter: 'blur(12px)',
          },
        }}
      />

      {/* Ambient RGB Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }}></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s', animationDelay: '2s' }}></div>
      </div>

      {/* Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3 cursor-pointer"
            >
              <div className="relative">
                <Zap className="w-10 h-10 text-cyan-400" fill="currentColor" />
                <div className="absolute inset-0 blur-lg bg-cyan-400/50"></div>
              </div>
              <span className="text-2xl tracking-wider" style={{ fontFamily: 'var(--font-display)' }}>
                <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  TECH
                </span>
                <span className="text-white">SHOP</span>
              </span>
            </motion.div>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-xl mx-8">
              <div className="relative w-full group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for components, peripherals..."
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-cyan-400/50 focus:bg-white/10 transition-all placeholder:text-gray-500"
                />
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-cyan-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10 transition-all pointer-events-none"></div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-6">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => toast.info('Account feature coming soon!')}
                className="hidden md:block text-gray-300 hover:text-white transition-colors"
              >
                Account
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsCartOpen(true)}
                className="relative group"
              >
                <ShoppingCart className="w-6 h-6 text-gray-300 group-hover:text-cyan-400 transition-colors" />
                {getTotalItems() > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 w-5 h-5 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-xs"
                  >
                    {getTotalItems()}
                  </motion.span>
                )}
              </motion.button>
              <button
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="inline-block px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 rounded-full mb-6"
              >
                <span className="text-sm tracking-wider text-cyan-400" style={{ fontFamily: 'var(--font-accent)' }}>
                  NEW ARRIVALS 2026
                </span>
              </motion.div>

              <h1 className="text-5xl md:text-7xl mb-6 leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
                <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  LEVEL UP
                </span>
                <br />
                <span className="text-white">YOUR SETUP</span>
              </h1>

              <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                Premium gaming components and cutting-edge PC hardware. Experience unmatched performance with RGB aesthetics.
              </p>

              <div className="flex flex-wrap gap-4">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(6, 182, 212, 0.5)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setShowAllProducts(true);
                    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg font-medium relative overflow-hidden group"
                  style={{ fontFamily: 'var(--font-accent)' }}
                >
                  <span className="relative z-10">SHOP NOW</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toast.info('PC Builder tool coming soon!', { description: 'Build your custom gaming PC with our configurator' })}
                  className="px-8 py-4 bg-white/5 border border-white/10 rounded-lg font-medium hover:bg-white/10 hover:border-purple-500/50 transition-all"
                  style={{ fontFamily: 'var(--font-accent)' }}
                >
                  EXPLORE BUILDS
                </motion.button>
              </div>

              <div className="grid grid-cols-3 gap-6 mt-12 pt-12 border-t border-white/10">
                {[
                  { label: 'Products', value: '10K+' },
                  { label: 'Happy Gamers', value: '50K+' },
                  { label: 'Reviews', value: '4.9★' }
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                  >
                    <div className="text-3xl mb-1 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent" style={{ fontFamily: 'var(--font-display)' }}>
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-500">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden border border-white/10 group">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1719927604476-dc404b85358f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxnYW1pbmclMjBjb21wdXRlciUyMFJHQiUyMHNldHVwfGVufDF8fHx8MTc3NjQ1MjE1NXww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Gaming PC Setup"
                  className="w-full h-auto transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-cyan-500/20 group-hover:via-purple-500/20 group-hover:to-pink-500/20 transition-all duration-700"></div>
              </div>

              {/* Floating Badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, type: 'spring', stiffness: 200 }}
                className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl border-4 border-background"
              >
                <div className="text-center">
                  <div className="text-xl" style={{ fontFamily: 'var(--font-display)' }}>20%</div>
                  <div className="text-xs">OFF</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-gradient-to-b from-transparent to-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl mb-12 text-center"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              SHOP BY CATEGORY
            </span>
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8, scale: 1.05 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => {
                  setSelectedCategory(selectedCategory === category.category ? null : category.category);
                  setShowAllProducts(true);
                  setTimeout(() => {
                    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }}
                className="relative group cursor-pointer"
              >
                <div className={`bg-white/5 border ${selectedCategory === category.category ? 'border-cyan-400/50 bg-white/10' : 'border-white/10'} rounded-xl p-6 hover:bg-white/10 hover:border-white/20 transition-all`}>
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${category.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <category.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-sm" style={{ fontFamily: 'var(--font-accent)' }}>{category.name}</h3>
                  {selectedCategory === category.category && (
                    <div className="absolute top-2 right-2">
                      <Check className="w-5 h-5 text-cyan-400" />
                    </div>
                  )}
                </div>
                <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-10 transition-opacity blur-xl`}></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="products" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                {selectedCategory ? 'FILTERED ' : ''}FEATURED GEAR
              </span>
            </motion.h2>
            <div className="flex items-center gap-4">
              {selectedCategory && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  onClick={() => setSelectedCategory(null)}
                  className="text-sm px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all"
                  style={{ fontFamily: 'var(--font-accent)' }}
                >
                  Clear Filter
                </motion.button>
              )}
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                whileHover={{ x: 5 }}
                onClick={() => setShowAllProducts(!showAllProducts)}
                className="text-cyan-400 hover:text-cyan-300 transition-colors"
                style={{ fontFamily: 'var(--font-accent)' }}
              >
                {showAllProducts ? 'Show Less' : 'View All'} →
              </motion.button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group cursor-pointer"
              >
                <div className="relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all">
                  {/* Badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <span className={`px-3 py-1 bg-gradient-to-r ${product.gradient} backdrop-blur-sm rounded-full text-xs border border-white/20`} style={{ fontFamily: 'var(--font-accent)' }}>
                      {product.badge}
                    </span>
                  </div>

                  {/* Image */}
                  <div className="relative h-64 overflow-hidden bg-black/20">
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${product.gradient} opacity-0 group-hover:opacity-30 transition-opacity`}></div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg flex-1" style={{ fontFamily: 'var(--font-accent)' }}>
                        {product.name}
                      </h3>
                      <div className="text-xl bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent" style={{ fontFamily: 'var(--font-display)' }}>
                        {product.price}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-gray-300">{product.rating}</span>
                      </div>
                      <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => addToCart(product)}
                      className="w-full py-3 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/30 rounded-lg hover:from-cyan-500/20 hover:to-purple-500/20 hover:border-cyan-500/50 transition-all group/btn"
                      style={{ fontFamily: 'var(--font-accent)' }}
                    >
                      <span className="text-cyan-400 group-hover/btn:text-cyan-300 flex items-center justify-center gap-2">
                        <ShoppingCart className="w-4 h-4" />
                        ADD TO CART
                      </span>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-white/20 rounded-3xl p-12 md:p-16 text-center backdrop-blur-sm"
          >
            <h2 className="text-4xl md:text-5xl mb-6" style={{ fontFamily: 'var(--font-display)' }}>
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                BUILD YOUR DREAM RIG
              </span>
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Get expert advice and custom PC building services. Free shipping on orders over $500.
            </p>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(168, 85, 247, 0.6)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => toast.success('PC Builder launched!', { description: 'Configure your dream gaming PC now' })}
              className="px-10 py-5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-lg"
              style={{ fontFamily: 'var(--font-accent)' }}
            >
              START BUILDING
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Shopping Cart Sidebar */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />

            {/* Cart Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-background border-l border-white/10 z-50 flex flex-col"
            >
              {/* Header */}
              <div className="p-6 border-b border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-2xl" style={{ fontFamily: 'var(--font-display)' }}>
                    <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                      CART
                    </span>
                  </h2>
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsCartOpen(false)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </motion.button>
                </div>
                <p className="text-sm text-gray-400">
                  {getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'} in your cart
                </p>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-6">
                {cartItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center">
                    <ShoppingCart className="w-16 h-16 text-gray-600 mb-4" />
                    <p className="text-gray-400 mb-2">Your cart is empty</p>
                    <p className="text-sm text-gray-500">Add some awesome gear to get started!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 100 }}
                        className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-all"
                      >
                        <div className="flex gap-4">
                          <div className="w-20 h-20 rounded-lg overflow-hidden bg-black/20 flex-shrink-0">
                            <ImageWithFallback
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm mb-2 truncate" style={{ fontFamily: 'var(--font-accent)' }}>
                              {item.name}
                            </h3>
                            <p className="text-lg bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent mb-3" style={{ fontFamily: 'var(--font-display)' }}>
                              {item.price}
                            </p>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg p-1">
                                <motion.button
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="p-1 hover:bg-white/10 rounded transition-colors"
                                >
                                  <Minus className="w-4 h-4" />
                                </motion.button>
                                <span className="w-8 text-center text-sm">{item.quantity}</span>
                                <motion.button
                                  whileTap={{ scale: 0.9 }}
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="p-1 hover:bg-white/10 rounded transition-colors"
                                >
                                  <Plus className="w-4 h-4" />
                                </motion.button>
                              </div>

                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => removeFromCart(item.id)}
                                className="p-2 hover:bg-red-500/10 hover:text-red-400 rounded-lg transition-colors"
                              >
                                <X className="w-4 h-4" />
                              </motion.button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {cartItems.length > 0 && (
                <div className="p-6 border-t border-white/10 bg-black/20">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-400">Subtotal</span>
                    <span className="text-2xl" style={{ fontFamily: 'var(--font-display)' }}>
                      <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                        ${getTotalPrice().toFixed(2)}
                      </span>
                    </span>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      toast.success('Proceeding to checkout!', { description: `Total: $${getTotalPrice().toFixed(2)}` });
                      setIsCartOpen(false);
                    }}
                    className="w-full py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl hover:shadow-lg hover:shadow-cyan-500/30 transition-all"
                    style={{ fontFamily: 'var(--font-accent)' }}
                  >
                    CHECKOUT
                  </motion.button>

                  <p className="text-xs text-center text-gray-500 mt-3">
                    Free shipping on orders over $500
                  </p>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            />

            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 h-full w-80 bg-background border-r border-white/10 z-40 md:hidden p-6"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <Zap className="w-8 h-8 text-cyan-400" fill="currentColor" />
                  <span className="text-xl" style={{ fontFamily: 'var(--font-display)' }}>
                    <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">TECH</span>
                    <span className="text-white">SHOP</span>
                  </span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <X className="w-6 h-6" />
                </motion.button>
              </div>

              {/* Mobile Search */}
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-cyan-400/50"
                  />
                </div>
              </div>

              {/* Mobile Navigation */}
              <nav className="space-y-2">
                {['Shop All', 'Build PC', 'Deals', 'Support', 'Account'].map((item) => (
                  <motion.button
                    key={item}
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      toast.info(`${item} section coming soon!`);
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-white/5 rounded-lg transition-colors"
                    style={{ fontFamily: 'var(--font-accent)' }}
                  >
                    {item}
                  </motion.button>
                ))}
              </nav>

              {/* Mobile Categories */}
              <div className="mt-8">
                <h3 className="text-sm text-gray-400 mb-3 px-4">CATEGORIES</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <motion.button
                      key={category.category}
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setSelectedCategory(category.category);
                        setShowAllProducts(true);
                        setIsMobileMenuOpen(false);
                        setTimeout(() => {
                          document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
                        }, 300);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 rounded-lg transition-colors"
                    >
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${category.gradient} flex items-center justify-center`}>
                        <category.icon className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm" style={{ fontFamily: 'var(--font-accent)' }}>
                        {category.name}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-black/40 border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Zap className="w-8 h-8 text-cyan-400" fill="currentColor" />
                <span className="text-xl" style={{ fontFamily: 'var(--font-display)' }}>
                  <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">TECH</span>
                  <span className="text-white">SHOP</span>
                </span>
              </div>
              <p className="text-gray-400 text-sm">
                Premium gaming components and PC hardware for enthusiasts.
              </p>
            </div>

            {[
              {
                title: 'Shop',
                links: ['Graphics Cards', 'Processors', 'Keyboards', 'Mice', 'Monitors', 'Accessories']
              },
              {
                title: 'Support',
                links: ['Contact Us', 'Shipping Info', 'Returns', 'Warranty', 'FAQ', 'Track Order']
              },
              {
                title: 'Company',
                links: ['About Us', 'Careers', 'Blog', 'Reviews', 'Partners', 'Affiliate']
              }
            ].map((section) => (
              <div key={section.title}>
                <h3 className="text-white mb-4" style={{ fontFamily: 'var(--font-accent)' }}>{section.title}</h3>
                <ul className="space-y-2">
                  {section.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">
              © 2026 TechShop. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors text-sm">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
