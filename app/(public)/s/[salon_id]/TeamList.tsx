const teamMembers = [
  {
    name: "Bonnie Green",
    role: "CEO/Co-founder",
    imageUrl:
      "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png",
    socialLinks: ["#", "#", "#", "#"],
  },
  {
    name: "Helene Engels",
    role: "CTO/Co-founder",
    imageUrl:
      "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/helene-engels.png",
    socialLinks: ["#", "#", "#", "#"],
  },
  {
    name: "Jese Leos",
    role: "SEO & Marketing",
    imageUrl:
      "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png",
    socialLinks: ["#", "#", "#", "#"],
  },
  {
    name: "Neil Sims",
    role: "Vue.js Developer",
    imageUrl:
      "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/neil-sims.png",
    socialLinks: ["#", "#", "#", "#"],
  },
  {
    name: "Leslie Livingston",
    role: "Graphic Designer",
    imageUrl: "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/thomas-lean.png",
    socialLinks: ["#", "#", "#", "#"]
  },
];

export default function TeamList() {
  return (
    <section className="bg-white w-full">
      <div className="pt-8 px-4 mx-auto text-center lg:pt-16 lg:px-6">
        <div className="mx-auto mb-8 max-w-screen">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 ">
            Our team
          </h2>
          <div className="mt-4 grid gap-8 lg:gap-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {teamMembers.map((member, index) => (
              <div key={index} className="text-center text-gray-500 400">
                <img
                  className="mx-auto mb-4 w-36 h-36 rounded-full"
                  src={member.imageUrl}
                  alt={`${member.name} Avatar`}
                />
                <h3 className="mb-1 text-2xl font-bold tracking-tight text-gray-900 ">
                  <a href="#">{member.name}</a>
                </h3>
                <p>{member.role}</p>
                <ul className="flex justify-center mt-4 space-x-4">
                  {member.socialLinks.map((link, i) => (
                    <li key={i}>
                      <a
                        href={link}
                        className={`text-[#${
                          i === 0
                            ? "39569c"
                            : i === 1
                            ? "00acee"
                            : i === 2
                            ? "gray-900"
                            : "ea4c89"
                        }] hover:text-gray-900 white`}
                      ></a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
