export const Statistics = () => {
  interface statsProps {
    quantity: string;
    description: string;
  }

  const stats: statsProps[] = [
    {
      quantity: '50K+',
      description: 'Active Students',
    },
    {
      quantity: '1.2K+',
      description: 'Expert Instructors',
    },
    {
      quantity: '500+',
      description: 'Courses Available',
    },
    {
      quantity: '98%',
      description: 'Success Rate',
    },
  ];

  return (
    <section id="statistics">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map(({ quantity, description }: statsProps) => (
          <div key={description} className="space-y-2 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary">
              {quantity}
            </h2>
            <p className="text-lg text-muted-foreground">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
