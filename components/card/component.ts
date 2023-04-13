import { hydrate} from "../../core/hydrate";
import html from './component.html?raw';

const comp = (model: Record<string, unknown>) => {
  const parser = new DOMParser();
  const parsed = parser.parseFromString(html, 'text/html');
  const el = parsed.body;
  const styles = parsed.styleSheets;


  hydrate(model, el)

  return el.children[0].outerHTML
}

export {comp};
export default html;
