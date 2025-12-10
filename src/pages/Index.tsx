import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [showSurprise, setShowSurprise] = useState(true);
  const [confetti, setConfetti] = useState<Array<{ id: number; left: string; delay: string; color: string }>>([]);
  const [wishes, setWishes] = useState([
    { id: 1, name: 'Мама', text: 'Ты самый лучший сын, твоя мама', avatar: '❤️' },
    { id: 2, name: 'Брат Серёжа', text: 'С днём рождения, брат! Желаю здоровья и счастья!', avatar: '🤝' },
  ]);
  const [newWish, setNewWish] = useState({ name: '', text: '' });

  useEffect(() => {
    if (showSurprise) {
      const confettiArray = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 2}s`,
        color: ['#F59E0B', '#8B5CF6', '#FEF7CD', '#FEC6A1', '#F2FCE2'][Math.floor(Math.random() * 5)]
      }));
      setConfetti(confettiArray);

      const timer = setTimeout(() => {
        setShowSurprise(false);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [showSurprise]);

  const handleAddWish = () => {
    if (newWish.name && newWish.text) {
      setWishes([...wishes, { id: Date.now(), ...newWish, avatar: '💝' }]);
      setNewWish({ name: '', text: '' });
    }
  };

  const qualities = [
    { icon: 'Heart', title: 'Добрый', description: 'Всегда готов помочь и поддержать' },
    { icon: 'Users', title: 'Заботливый', description: 'Лучший отец и муж' },
    { icon: 'Sparkles', title: 'Мудрый', description: 'Знает ответы на все вопросы' },
    { icon: 'Trophy', title: 'Успешный', description: 'Достиг многого в жизни' },
    { icon: 'Smile', title: 'Весёлый', description: 'Всегда поднимает настроение' },
    { icon: 'Shield', title: 'Надёжный', description: 'На него можно положиться' },
  ];

  if (showSurprise) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center overflow-hidden">
        {confetti.map((c) => (
          <div
            key={c.id}
            className="absolute w-3 h-3 rounded-full animate-confetti"
            style={{
              left: c.left,
              animationDelay: c.delay,
              backgroundColor: c.color,
              top: '-10%'
            }}
          />
        ))}
        <div className="text-center animate-scale-in z-10">
          <h1 className="text-7xl md:text-9xl font-montserrat font-bold text-primary mb-4">
            54!
          </h1>
          <p className="text-3xl md:text-5xl font-montserrat font-semibold text-foreground">
            С Днём Рождения, Папа! 🎉
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <header className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-montserrat font-bold text-primary mb-4">
            С Днём Рождения, Папа! 🎂
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground font-sans">
            Самому доброму папе на свете — 54 года!
          </p>
        </header>

        <section className="mb-16 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <h2 className="text-3xl md:text-4xl font-montserrat font-semibold text-center mb-10 text-foreground">
            Почему ты самый лучший 💛
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {qualities.map((quality, index) => (
              <Card 
                key={index} 
                className="p-6 bg-card hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-border"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center">
                    <Icon name={quality.icon} size={32} className="text-accent-foreground" />
                  </div>
                  <h3 className="text-2xl font-montserrat font-semibold text-foreground">
                    {quality.title}
                  </h3>
                  <p className="text-muted-foreground font-sans">
                    {quality.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-16 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <h2 className="text-3xl md:text-4xl font-montserrat font-semibold text-center mb-10 text-foreground">
            Стена поздравлений 💬
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {wishes.map((wish, index) => (
              <Card 
                key={wish.id} 
                className="p-6 bg-card border-2 border-border hover:shadow-lg transition-shadow"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-start space-x-4">
                  <div className="text-4xl">{wish.avatar}</div>
                  <div className="flex-1">
                    <h4 className="font-montserrat font-semibold text-lg text-foreground mb-2">
                      {wish.name}
                    </h4>
                    <p className="text-muted-foreground font-sans italic">
                      "{wish.text}"
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Card className="p-8 bg-card border-2 border-primary">
            <h3 className="text-2xl font-montserrat font-semibold text-center mb-6 text-foreground">
              Добавь своё поздравление! ✨
            </h3>
            <div className="space-y-4 max-w-xl mx-auto">
              <Input
                placeholder="Твоё имя"
                value={newWish.name}
                onChange={(e) => setNewWish({ ...newWish, name: e.target.value })}
                className="border-2 border-border focus:border-accent"
              />
              <Textarea
                placeholder="Напиши своё пожелание папе..."
                value={newWish.text}
                onChange={(e) => setNewWish({ ...newWish, text: e.target.value })}
                rows={4}
                className="border-2 border-border focus:border-accent"
              />
              <Button 
                onClick={handleAddWish}
                className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-montserrat text-lg h-12"
              >
                <Icon name="Send" size={20} className="mr-2" />
                Отправить поздравление
              </Button>
            </div>
          </Card>
        </section>

        <footer className="text-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <Card className="p-8 bg-gradient-to-r from-primary/10 to-accent/10 border-2 border-primary">
            <p className="text-2xl md:text-3xl font-montserrat font-semibold text-foreground mb-3">
              Папа, ты самый лучший! 💖
            </p>
            <p className="text-lg text-muted-foreground font-sans">
              С любовью, от твоего 15-летнего сына
            </p>
          </Card>
        </footer>
      </div>
    </div>
  );
};

export default Index;