const testimonials = [
  {
    content: "HouseSync made finding the perfect tenant for my property a breeze. The AI matching is spot-on!",
    author: "Sarah Johnson",
    role: "Landlord, New York",
  },
  {
    content:
      "As a first-time renter, HouseSync's verification process gave me peace of mind. I found a great apartment quickly!",
    author: "Michael Chen",
    role: "Tenant, San Francisco",
  },
  {
    content:
      "The efficiency of HouseSync's platform has dramatically reduced our property's vacancy rates. It's a game-changer.",
    author: "Emily Rodriguez",
    role: "Property Manager, Chicago",
  },
]

export default function TestimonialsSection() {
  return (
    <section className="bg-gray-50 py-12 sm:py-16 lg:py-20" id="testimonials">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Trusted by renters and landlords alike
          </h2>
          <p className="mt-4 text-lg text-gray-500">Here's what our users have to say about HouseSync</p>
        </div>
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="rounded-lg bg-white p-6 shadow-md">
              <p className="text-gray-600">&ldquo;{testimonial.content}&rdquo;</p>
              <div className="mt-4">
                <p className="font-semibold text-gray-900">{testimonial.author}</p>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

