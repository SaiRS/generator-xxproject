// 因为ts源码编译到generator中，我们也需要将对应的资源复制过去
import { copySrcTemplatesToGeneratorTemplates } from '@src/tools/copy-help';

copySrcTemplatesToGeneratorTemplates('babel');
