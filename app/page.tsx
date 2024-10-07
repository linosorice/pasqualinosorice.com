import { BlogPosts } from 'app/components/posts'
import Link from 'next/link'
import Image from 'next/image'

export default function Page() {
  return (
    <section>
      <h1 className='font-bold text-2xl mb-8 tracking-tighter'>hey, I'm Pasqualino Sorice 👋</h1>
      <p className='prose prose-neutral dark:prose-invert'>
        I'm a passionate computer engineer with a knack for innovation, especially within the
        dynamic world of insurance inside{' '}
        <Link href='https://mioassicuratore.it' target='_blank'>
          MioAssicuratore
        </Link>
        . Beyond my tech pursuits, I wear the badge of a proud and incredibly happy father. My
        journey in the tech realm has been an exhilarating ride, weaving through the realms of
        blockchain and mobile applications. Additionally, I have a growing interest in exploring the
        world of indie hacking, seeking new avenues and opportunities in this vibrant community.
      </p>
      <div className='column-1 sm:columns-2 gap-4 my-8'>
        <div className='relative h-72 sm:h-60 mb-4'>
          <Image
            alt='Christmas party at MioAssicuratore'
            src='/mioassicuratore_natale.jpg'
            fill
            sizes='(max-width: 768px) 213px, 33vw'
            priority
            className='rounded-lg object-cover'
          />
        </div>
        <div className='relative h-72 sm:h-60 mb-4'>
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
          concepts with elegant tech solutions to reshape the industry.
        </p>
      </div>
      <div className='prose prose-neutral dark:prose-invert'>
        <p>
          🌟 <b>CiaoTeam</b>: Uniting Virtually, Powering Teams! Amidst this exciting journey, I'm
          steering a remarkable project called{' '}
          <Link href='https://ciaoteam.com' target='_blank'>
            CiaoTeam
          </Link>
          . This Virtual Team Building platform is my brainchild, designed to connect teams across
          distances, fostering collaboration, camaraderie, and productivity like never before.
          Through CiaoTeam, I'm igniting a new era of remote teamwork that transcends geographical
          boundaries.
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
          So, whether I'm shaping fintech futures, unraveling blockchain mysteries, crafting digital
          marvels, or reveling in the pure happiness of fatherhood, one thing remains constant: my
          unwavering commitment to innovation. Join me on this tech odyssey, where the possibilities
          are limitless!
        </p>
      </div>
      <div className="my-8">
        <BlogPosts limit={10} />
      </div>
    </section>
  )
}
