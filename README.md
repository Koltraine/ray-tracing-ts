# Ray Tracing in TypeScript

This project is an implementation of ray tracing using TypeScript. The primary motivation behind choosing TypeScript was my comfort with the language, as I am not as experienced with ray tracing. This project served as a personal educational journey and was both challenging and rewarding to build.

## Motivation

The goal was to explore the concepts of ray tracing while leveraging a language I am familiar with. Although the performance is not optimal, it provides an opportunity to explore threading in the future to enhance efficiency.

## Challenges

Throughout the development of this project, I encountered significant challenges, particularly with implementing Dielectrics and Defocus Blur (depth of field). These topics were complex and required a deeper understanding of the underlying principles of ray tracing. Despite these difficulties, overcoming them was a crucial part of the journey.

## Custom Features

While I did not follow the tutorial line by line, I adapted certain aspects to better fit TypeScript's coding style. 

### Exporter
The exporter was a late addition to the project, and I regret not starting with it. It has become an invaluable tool, allowing me to review my previous renders and reflect on the project's evolution.

### CameraBuilder
I also implemented a `CameraBuilder` for fun and to take breaks from the core graphics work. This feature was designed to enhance the flexibility and ease of configuring camera settings within the project.

## Performance

During the project, I encountered performance issues with TypeScript, especially as the project progressed. Each render took approximately 5 minutes, even with low anti-aliasing sampling and a resolution of 400x225 or 640x360. In an attempt to improve performance, I compiled everything into a single file using Webpack. However, this optimization was less effective than I had hoped. I plan to focus on enhancing performance in the future.

## Future possibilities

To enhance performance, I plan to implement multithreading to divide the rendering workload across multiple threads. This approach should significantly reduce render times and improve efficiency. Additionally, I aim to review and optimize my code to minimize the allocation of new vectors, rays, and colors, which could further enhance performance by reducing memory overhead and improving execution speed.

Incorporating a light source into the ray tracing project can significantly enhance the visual appeal of the rendered scenes. By simulating realistic lighting, shadows, and highlights, the scenes become more dynamic and lifelike. The addition of a light source allows for more complex interactions between objects and light, such as reflections and refractions, which contribute to the overall realism of the scene.


## Acknowledgments

This project was inspired by the [_Ray Tracing in One Weekend_](https://raytracing.github.io/books/RayTracingInOneWeekend.html) series by Peter Shirley, Trevor David Black, and Steve Hollasch. While I deviated from the tutorial in some areas, their work provided a foundational understanding of ray tracing concepts.