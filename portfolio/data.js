const portfolioData = {
    "personal": {
        "name": "Shreyash Singh",
        "role": "Data Engineer | ETL Developer",
        "summary": "Designing and implementing scalable, metadata-driven, cloud-native data pipelines. Leveraging modern architectures to transform complex data into actionable insights.",
        "email": "shreyashsingh601@gmail.com",
        "phone": "+91 7030346254",
        "location": "Vasai, Mumbai, India",
        "linkedin": "https://linkedin.com/in/shreyash-singh-26b555166",
        "github": "https://github.com/shreyash333",
        "instagram": "https://www.instagram.com/singh.shreyash_",
        "youtube": "https://www.youtube.com/@shreyashsingh9914",
        "yearsExperience": "4+"
    },
    "about": [
        "Data Engineer with 4+ years of experience designing and implementing scalable, metadata-driven, cloud-native data pipelines, leveraging ETL/ELT, Data Vault 2.0, and Data Lake 2.0 architectures across batch and streaming workloads using AWS, Snowflake, Spark, Kafka, dbt, Matillion, and Control-M.",
        "Experienced in building automated ingestion frameworks for 30+ source applications including MySQL, Oracle, and MariaDB, developing complex SQL transformation logic, and enabling real-time reporting, analytics, and AI/ML-driven insights.",
        "Strong expertise in batch and streaming pipelines, orchestration, monitoring, reconciliation, CI/CD, performance optimization, and enterprise-scale data engineering solutions. Passionate about learning modern data architectures and expanding expertise across AWS, Azure, and GCP-based data engineering ecosystems."
    ],
    "skills": [
        {
            "category": "Programming & Databases",
            "icon": "fas fa-code",
            "items": [
                "Python",
                "SQL",
                "JavaScript",
                "SQL Server",
                "MySQL",
                "Oracle"
            ]
        },
        {
            "category": "Data Engineering",
            "icon": "fas fa-database",
            "items": [
                "Snowflake",
                "Matillion",
                "dbt Core",
                "dbt Cloud",
                "Kafka",
                "PySpark",
                "Pandas",
                "NumPy",
                "Power BI",
                "Tableau",
                "SSIS"
            ]
        },
        {
            "category": "Cloud & DevOps",
            "icon": "fas fa-cloud",
            "items": [
                "AWS (S3, EC2, Batch, CloudWatch)",
                "Azure DevOps (CI/CD)",
                "Git",
                "Docker",
                "Control-M",
                "Airflow"
            ]
        },
        {
            "category": "Concepts & Architecture",
            "icon": "fas fa-network-wired",
            "items": [
                "ETL/ELT",
                "Batch & Streaming",
                "Data Lake 2.0",
                "Delta Lake",
                "Data Vault 2.0",
                "CDC",
                "SCD",
                "Metadata-Driven Frameworks"
            ]
        }
    ],
    "experience": [
        {
            "role": "Senior Data Engineer (Aug 2024 - Present) | Data Engineer (Jul 2022 - Jul 2024)",
            "company": "Tata Consultancy Services Ltd | Mumbai, India",
            "period": "Jul 2022 - Present",
            "bullets": [
                "Spearheaded end-to-end data engineering initiatives for a leading US-based insurance (BFSI) client, managing the ingestion, transformation, and orchestration of massive-scale enterprise data.",
                "<strong>Architectural Initiatives:</strong> Successfully designed and deployed <em>Data Vault 2.0 & Kappa Architecture</em>, <em>Data Lake 2.0 & Lambda Architecture</em>, <em>Legacy Modernization Architecture</em>, and a <em>Centralized Medallion Architecture</em> using Databricks.",
                "<br><strong style=\"color: var(--accent-primary); font-size: 1.1em; display: inline-block; margin-top: 5px;\">Key Achievements</strong>",
                "<strong>Snowflake Performance:</strong> Accelerated historical data reloads by over 90% (from ~6 hours to ~30 minutes) by orchestrating parallel file loading and dynamically scaling virtual warehouse compute.",
                "<strong>Query Optimization:</strong> Slashed critical reporting query runtimes from ~3 minutes to under 10 seconds by engineering Snowflake Materialized Views to eliminate expensive repeated joins.",
                "<strong>DBT Migration:</strong> Migrated 100+ legacy on-premises stored procedures into modular DBT workflows. Resolved complex circular dependencies by designing a strict layered architecture.",
                "<strong>Databricks Tuning:</strong> Reduced PySpark job execution times by up to 85% on Databricks by implementing Adaptive Query Execution (AQE), strategic partitioning, and Z-Ordering (OPTIMIZE) on Delta tables.",
                "<strong>Data Vault 2.0 Integrity:</strong> Restored enterprise data integrity by diagnosing and rebuilding Data Vault 2.0 Satellite tables, correcting complex hash-key logic to unblock downstream analytics.",
                "<strong>Control-M Reliability:</strong> Reduced production ETL failure tickets by 90% by engineering automated dependency-handling and intelligent rerun mechanisms within Control-M."
            ]
        },
        {
            "role": "Flutter Developer Intern",
            "company": "Scinotic Solution Pvt Ltd",
            "period": "Dec 2019 \u2013 Jan 2021",
            "bullets": [
                "Developed a bespoke mobile app for a US-based container shipment client, delivering a tailored solution that met their precise needs. Designed responsive screens, implemented new features, handled file uploads/downloads, and integrated the app with provided APIs.",
                "Successfully designed and developed multiple full-fledged mobile app UIs, complete with corresponding business logic.",
                "Designed and implemented a comprehensive food delivery app system, seamlessly integrating vendor, customer, and driver interfaces to provide a cohesive user experience."
            ]
        }
    ],
    "projects": [
        {
            "title": "Metadata-Driven Data Pipeline",
            "tag": "Data Vault 2.0",
            "techStack": "Python, Snowflake, AWS, Control-M, Data Vault 2.0",
            "description": "Designed and developed a metadata-driven pipeline to onboard 30+ source systems into Snowflake through AWS S3. Built Hub, Link, and Satellite models to enable scalable enterprise analytics."
        },
        {
            "title": "Streaming & Batch Pipeline",
            "tag": "Kappa / Data Lake 2.0",
            "techStack": "Python, Snowflake, Kafka, AWS, Control-M",
            "description": "Built a hybrid pipeline using a Metadata-Driven Ingestion Framework. Integrated Kafka connectors and CDC-based ingestion for near real-time updates while maintaining EOD/EOM processing."
        },
        {
            "title": "Modernized Transformation Framework",
            "tag": "dbt / ELT",
            "techStack": "Matillion, dbt Cloud/Core, Snowflake, SQL",
            "description": "Modernized legacy ETL frameworks by building orchestration pipelines. Developed modular transformation models using dbt to implement scalable ELT-based processing and improve maintainability."
        },
        {
            "title": "Low-Latency Reporting Pipeline",
            "tag": "Optimization",
            "techStack": "Snowflake, SQL, Python, Power BI",
            "description": "Developed low-latency reporting pipelines for enterprise dashboards. Created metadata-driven SQL logic and optimized queries for EOD, EDM, and historical tables to significantly improve dashboard performance."
        },
        {
            "title": "API-Based Analytics Pipeline",
            "tag": "Personal Project",
            "techStack": "Python, PySpark, Snowflake, dbt Core, Docker",
            "description": "End-to-end data engineering pipeline fetching YouTube API data. Developed PySpark transformations for cleansing and aggregation before loading into Snowflake and generating Power BI insights.",
            "videoUrl": "https://www.youtube.com/watch?v=8uvEBhyybxc"
        },
        {
            "title": "A Criminal Record Keeper System using Blockchain",
            "tag": "B.E. Major Project",
            "techStack": "Flutter, Node.js, Express, REST APIs, Truffle, Ganache-cli, IPFS Infura, MongoDB",
            "description": "A mobile app enabling police to file FIRs instantly from anywhere, providing secure storage and easy access to judiciary organizations, utilizing blockchain technology for efficiency and security.",
            "videoUrl": "https://www.youtube.com/watch?v=V8Un7IDETtg"
        },
        {
            "title": "French Audio to English Text Translator",
            "tag": "Personal Project",
            "techStack": "Python, NLP, Speech Recognition, Deep Translator, Pydub",
            "description": "A program that converts French audio into English text and can translate any language audio to text, helpful for adding CC to videos in any language."
        },
        {
            "title": "Automated Assignment Checker",
            "tag": "Mini Project",
            "techStack": "NLP, Tokenization, Python, Cosine Similarity, Flask, HTML, CSS, JavaScript",
            "description": "A web-based plagiarism detection tool that analyzes students' assignments, clusters those exceeding a threshold plagiarism percentage, and generates a report to aid teachers in grading originality and preventing plagiarism.",
            "videoUrl": "https://www.youtube.com/watch?v=nWL2d1BpQZ8"
        },
        {
            "title": "ML Model for Predicting Future Risk of Suicide",
            "tag": "Mini Project",
            "techStack": "Flask, Machine Learning (Linear Regression, Decision Tree), Google Colab",
            "description": "A web application offering four key features: viewing historical suicide statistics, predicting nationwide suicide counts, forecasting state-level suicide counts, and assessing individual suicide tendencies.",
            "videoUrl": "https://www.youtube.com/watch?v=QdstFAmKn3s"
        },
        {
            "title": "Avaandha - Scrap Deal Management System",
            "tag": "Hackathon Project | April 2021",
            "techStack": "Flutter, Node.js, Xampp, MySQL",
            "description": "Complete functional system for scrap dealing with three user types: customer, store, and company. Facilitated Buy, Sell, Donate, and Barter orders with a hierarchical order flow. Included 'best out of waste' tutorials for users."
        },
        {
            "title": "Complete Food Delivery App",
            "tag": "Internship Project | Jan 2021",
            "techStack": "Flutter, Dart",
            "description": "Developed complete App UI and business logic for a food delivery platform. Created three distinct, fully responsive applications for Customers, Vendors, and Drivers, seamlessly integrated with the backend."
        }
    ],
    "blogs": [
        {
            "title": "15 AI Concepts I Wish Someone Had Explained Me Simply",
            "platform": "LinkedIn",
            "url": "https://www.linkedin.com/pulse/15-ai-concepts-i-wish-someone-had-explained-me-simply-shreyash-singh-y9p2f"
        },
        {
            "title": "AI LLM Transformer",
            "platform": "LinkedIn",
            "url": "https://www.linkedin.com/posts/shreyash-singh-26b555166_ai-llm-transformer-share-7487956444479291394-Bm99/"
        },
        {
            "title": "Data Engineering Big Data Algorithms",
            "platform": "LinkedIn",
            "url": "https://www.linkedin.com/posts/shreyash-singh-26b555166_dataengineering-bigdata-algorithms-share-7487951107542007809-4RYz/"
        },
        {
            "title": "Snowflake GenAI Cortex",
            "platform": "LinkedIn",
            "url": "https://www.linkedin.com/posts/shreyash-singh-26b555166_snowflake-genai-snowflakecortex-share-7416962269928042496-d-Dn/"
        },
        {
            "title": "Demystifying Snowflake",
            "platform": "LinkedIn",
            "url": "https://www.linkedin.com/posts/shreyash-singh-26b555166_%F0%9D%97%97%F0%9D%97%B2%F0%9D%97%BA%F0%9D%98%86%F0%9D%98%80%F0%9D%98%81%F0%9D%97%B6%F0%9D%97%B3%F0%9D%98%86%F0%9D%97%B6%F0%9D%97%BB%F0%9D%97%B4-%F0%9D%97%A6%F0%9D%97%B9%F0%9D%97%BC%F0%9D%98%84%F0%9D%97%B9%F0%9D%98%86-share-7416958842439294976-RRxs/"
        },
        {
            "title": "Kafka Data Engineering",
            "platform": "LinkedIn",
            "url": "https://www.linkedin.com/posts/shreyash-singh-26b555166_kafka-dataengineering-data-share-7371665385282080768-0J3n/"
        },
        {
            "title": "Data Engineering PySpark Snowflake",
            "platform": "LinkedIn",
            "url": "https://www.linkedin.com/posts/shreyash-singh-26b555166_dataengineering-pyspark-snowflake-share-7368047011301974016-U8L7/"
        },
        {
            "title": "PySpark Apache Spark Big Data",
            "platform": "LinkedIn",
            "url": "https://www.linkedin.com/posts/shreyash-singh-26b555166_pyspark-apachespark-bigdata-share-7364379835802050560-tEPk/"
        },
        {
            "title": "Spark Architecture Apache",
            "platform": "LinkedIn",
            "url": "https://www.linkedin.com/posts/shreyash-singh-26b555166_%F0%9D%97%A6%F0%9D%97%BD%F0%9D%97%AE%F0%9D%97%BF%F0%9D%97%B8-%F0%9D%97%94%F0%9D%97%BF%F0%9D%97%B0%F0%9D%97%B5%F0%9D%97%B6%F0%9D%98%81%F0%9D%97%B2%F0%9D%97%B0%F0%9D%98%81%F0%9D%98%82%F0%9D%97%BF%F0%9D%97%B2-apache-share-7363263314891620353-z-bR/"
        },
        {
            "title": "DBT Data Engineer Data Transformation",
            "platform": "LinkedIn",
            "url": "https://www.linkedin.com/posts/shreyash-singh-26b555166_dbt-dataengineer-datatransformation-share-7360767194940530688-XvSw/"
        },
        {
            "title": "Data Engineering Modern Data Stack",
            "platform": "LinkedIn",
            "url": "https://www.linkedin.com/posts/shreyash-singh-26b555166_dataengineering-moderndatastack-datamodeling-share-7359724288909750272-Kzvs/"
        },
        {
            "title": "Data Engineering Tools",
            "platform": "LinkedIn",
            "url": "https://www.linkedin.com/posts/shreyash-singh-26b555166_data-engineering-tools-ugcPost-7350644772392308737-yzdZ/"
        },
        {
            "title": "Data Engineering AI In ETL Machine Learning",
            "platform": "LinkedIn",
            "url": "https://www.linkedin.com/posts/shreyash-singh-26b555166_dataengineering-aiinetl-machinelearning-share-7349939203352293377-ewZ9/"
        },
        {
            "title": "Data Engineering ETL Cloud Architecture",
            "platform": "LinkedIn",
            "url": "https://www.linkedin.com/posts/shreyash-singh-26b555166_dataengineering-etl-cloudarchitecture-share-7343193040058003459-x27x/"
        },
        {
            "title": "Data Engineering Medallion Architecture Snowflake",
            "platform": "LinkedIn",
            "url": "https://www.linkedin.com/posts/shreyash-singh-26b555166_dataengineering-medallionarchitecture-snowflake-share-7340468913182248960-cYhB/"
        },
        {
            "title": "Two Years Of Data Discovery And Growth",
            "platform": "LinkedIn",
            "url": "https://www.linkedin.com/posts/shreyash-singh-26b555166_two-years-of-data-discovery-and-growth-share-7232756232992788482-oQ4M/"
        },
        {
            "title": "Article Network Project",
            "platform": "LinkedIn",
            "url": "https://www.linkedin.com/posts/shreyash-singh-26b555166_article-network-project-share-7187361134784430080-j3aD/"
        },
        {
            "title": "Data Engineer Growth Mindset One Year Anniversary",
            "platform": "LinkedIn",
            "url": "https://www.linkedin.com/posts/shreyash-singh-26b555166_dataengineer-growthmindset-oneyearanniversary-ugcPost-7088928204077330432-6pnf/"
        },
        {
            "title": "Engineering Saga: From Dreams To Reality",
            "platform": "LinkedIn",
            "url": "https://www.linkedin.com/posts/shreyash-singh-26b555166_engineeringsaga-gratitudeforexperience-fromdreamstoreality-ugcPost-7069365828042801152-NNX2/"
        },
        {
            "title": "Building A Scalable Data Architecture With Apache Tools",
            "platform": "Dev.to",
            "url": "https://dev.to/shreyash333/building-a-scalable-data-architecture-with-apache-tools-a-free-and-open-source-solution-34hm"
        },
        {
            "title": "Building A Self Optimizing Data Pipeline",
            "platform": "Dev.to",
            "url": "https://dev.to/shreyash333/building-a-self-optimizing-data-pipeline-59da"
        },
        {
            "title": "Data Warehousing Architectures",
            "platform": "Dev.to",
            "url": "https://dev.to/shreyash333/data-warehousing-architectures-53ej"
        },
        {
            "title": "Understanding Azure DevOps Services",
            "platform": "Dev.to",
            "url": "https://dev.to/shreyash333/understanding-azure-devops-services-and-exploring-alternatives-1ln1"
        },
        {
            "title": "Darq The Future Technology",
            "platform": "Dev.to",
            "url": "https://dev.to/shreyash333/darq-the-future-technology-10hh"
        },
        {
            "title": "My Journey Towards Flutter",
            "platform": "Dev.to",
            "url": "https://dev.to/shreyash333/my-journey-towards-flutter-45p7"
        }
    ],
    "education": [
        {
            "degree": "Master of Business Administration",
            "major": "Operations Management",
            "institution": "IGNOU Mumbai (Distance Learning)",
            "period": "Jan 2026 - Present",
            "grade": "",
            "icon": "fas fa-graduation-cap"
        },
        {
            "degree": "Bachelor of Engineering",
            "major": "Computer Science",
            "institution": "Mumbai University (St. John College)",
            "period": "July 2018 - June 2022",
            "grade": "CGPA: 9.49",
            "icon": "fas fa-university"
        }
    ],
    "certifications": [
        {
            "name": "Databricks Certified Data Engineer Associate",
            "issuer": "Databricks",
            "date": "14 September 2026",
            "icon": "fas fa-certificate",
            "url": "https://credentials.databricks.com/e922de5c-10b3-42f9-b6a8-014cc4698158"
        }
    ],
    "publications": [
        {
            "title": "A Criminal Record Keeper System using Blockchain",
            "conference": "IEEE International Conference ICOEI-2022",
            "organizer": "SCADCET, Tirunelveli",
            "date": "Apr 2022",
            "type": "Presented and published",
            "linkIEEE": "https://ieeexplore.ieee.org/document/9776725",
            "linkRG": "https://www.researchgate.net/publication/363037866_A_Criminal_Record_Keeper_System_using_Blockchain"
        },
        {
            "title": "A Machine Learning Prediction Model for Envisaging Future Risk of Suicide",
            "conference": "IEEE International Conference ICNTE 2023",
            "organizer": "Nascent Technologies in Engineering",
            "date": "June 2023",
            "type": "Presented",
            "linkIEEE": "https://ieeexplore.ieee.org/document/10146651",
            "linkRG": "https://www.researchgate.net/publication/371525535_A_Machine_Learning_Prediction_Model_for_Envisaging_Future_Risk_of_Suicide"
        }
    ]
};