import Seo from '@/components/seo/Seo'
import { View } from '@/components/blocks/Hero'
import CourseCard from '@/components/academy/CourseCard'
import { PATHS } from '@/constant/routes'
import { COURSES } from '@/data/academy'

export default function AcademyProgrammes() {
  return (
    <View>
      <Seo
        title="AI Academy programmes"
        description="Two hands-on AI programmes taught by the people who build AI for real businesses: the AI Growth Blueprint strategy workshop and the AI Business Playbook for day-to-day work."
        path={PATHS.academyProgrammes}
      />
      <section id="programmes">
        <div className="ac-wrap">
          <div className="ac-head">
            <span className="ac-label">Programmes</span>
            <h2>Explore courses</h2>
            <p className="ac-lede">
              Two hands-on programmes, taught by the people who build AI for real businesses. Start with the one that fits your next step.
            </p>
          </div>
          <div className="ac-catalog">
            {COURSES.map((c) => (
              <CourseCard c={c} key={c.id} />
            ))}
          </div>
        </div>
      </section>
    </View>
  )
}
