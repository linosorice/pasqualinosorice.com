import { BlogPosts } from 'app/components/posts'
import Link from 'next/link'
import Image from 'next/image'
import { Metadata } from 'next'
import { baseUrl } from './sitemap'

export const metadata: Metadata = {
  alternates: {
    canonical: baseUrl
  }
}

export default function Page() {
  return (
    <section>
      <h1 className='mb-8 text-2xl font-bold tracking-tighter'>hey, I'm Pasqualino Sorice 👋</h1>
      <p className='prose prose-neutral dark:prose-invert'>
        I'm a passionate computer engineer with a knack for innovation, especially within the
        dynamic world of insurance inside{' '}
        <Link href='https://www.mioassicuratore.it' className='interlink' target='_blank'>
          MioAssicuratore
        </Link>
        . Beyond my tech pursuits, I wear the badge of a proud and incredibly happy father. My
        journey in the tech realm has been an exhilarating ride, weaving through the realms of
        blockchain, mobile applications, and <b>AI integration in startups</b>. Additionally, I have
        a growing interest in exploring the world of indie hacking, seeking new avenues and
        opportunities in this vibrant community.
      </p>
      <div className='column-1 my-8 gap-4 sm:columns-2'>
        <div className='relative mb-4 h-72 sm:h-60'>
          <Image
            alt='Christmas party at MioAssicuratore'
            src='/mioassicuratore_natale.jpg'
            fill
            sizes='(max-width: 768px) 213px, 33vw'
            priority
            className='rounded-lg object-cover'
          />
        </div>
        <div className='relative mb-4 h-72 sm:h-60'>
          <Image
            alt='Team building at MioAssicuratore'
            src='/mioassicuratore_team_building.jpg'
            fill
            sizes='(max-width: 768px) 213px, 33vw'
            priority
            className='rounded-lg object-cover'
          />
        </div>
      </div>
      <div className='prose prose-neutral dark:prose-invert'>
        <p>
          🔍 <b>Fintech Visionary</b>: With a solid background in computer engineering, I've
          seamlessly ventured into the fintech landscape, honing my skills in revolutionizing
          insurance through cutting-edge technology. My expertise lies in fusing intricate financial
          concepts with elegant tech solutions to reshape the industry, including{' '}
          <b>AI implementation in business processes</b>.
        </p>
      </div>
      <div className='prose prose-neutral dark:prose-invert'>
        <p>
          🌟 <b>ExaminatorAI</b>: I'm leading an innovative project called{' '}
          <Link href='https://examinatorai.com' className='interlink' target='_blank'>
            <b>ExaminatorAI</b>
          </Link>
          , driven by a clear mission: empowering students to understand how prepared they are for
          their exams. <b>This AI-powered platform leverages</b> cutting-edge artificial
          intelligence both in its core functionality and implementation. Through ExaminatorAI,
          we're revolutionizing the way students assess their exam readiness, providing them with
          intelligent insights and personalized feedback to boost their academic confidence.
        </p>
      </div>
      <div className='prose prose-neutral dark:prose-invert'>
        <p>
          🌐 <b>Blockchain Maestro</b>: I've been in the trenches of blockchain, exploring its
          transformative power to enhance security, transparency, and efficiency. My contributions
          have been instrumental in paving new avenues for financial transactions and beyond.
        </p>
      </div>
      <div className='prose prose-neutral dark:prose-invert'>
        <p>
          📱 <b>Mobile App Aficionado</b>: Mobile applications are my playground, where I've crafted
          user-centric experiences that seamlessly meld functionality and aesthetics. My past
          ventures have left an indelible mark on the digital landscape.
        </p>
      </div>
      <div className='prose prose-neutral dark:prose-invert'>
        <p>
          👨‍👩‍👧‍👦 <b>Fatherhood's Joyful Adventure</b>: In the midst of all these tech endeavors, I
          proudly embrace the role of a devoted father. My family brings boundless joy and
          inspiration to my life, reminding me of the importance of balance, love, and shared
          moments.
        </p>
      </div>
      <div className='prose prose-neutral dark:prose-invert'>
        <p>
          So, whether I'm shaping fintech futures with AI, unraveling blockchain mysteries, crafting
          digital marvels powered by artificial intelligence, or reveling in the pure happiness of
          fatherhood, one thing remains constant: my unwavering commitment to innovation and
          exploring AI's transformative potential. Join me on this tech odyssey, where the
          possibilities are limitless and AI helps pave the way forward!
        </p>
      </div>
      <div className='my-8'>
        <BlogPosts limit={10} />
      </div>
    </section>
  )
}
