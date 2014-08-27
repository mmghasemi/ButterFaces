package de.larmic.butterfaces.component.partrenderer;

import de.larmic.butterfaces.component.html.HtmlInputComponent;
import de.larmic.butterfaces.component.html.HtmlTextArea;

import javax.faces.component.UIInput;
import javax.faces.context.ResponseWriter;
import java.io.IOException;

/**
 * Created by larmic on 27.08.14.
 */
public class CharacterCounterPartRenderer {

    private static final String TEXT_AREA_MAXLENGTH_COUNTER_CLASS = "larmic-component-textarea-maxlength-counter";
    private static final String OUTERDIV_POSTFIX = "_outerComponentDiv";

    public void renderCharacterCounter(final HtmlInputComponent component, final ResponseWriter responseWriter) throws IOException {
        final UIInput uiComponent = (UIInput) component;

        final String outerComponentId = component.getClientId() + OUTERDIV_POSTFIX;

        if (uiComponent instanceof HtmlTextArea) {
            final StringBuffer jsCall = new StringBuffer();
            jsCall.append("new TextareaComponentHandler");
            jsCall.append("('").append(outerComponentId).append("', {");
            jsCall.append("showTooltip:" + new TooltipPartRenderer().calculateShowTooltip(component));

            if (uiComponent instanceof HtmlTextArea && ((HtmlTextArea) uiComponent).getMaxLength() != null) {
                responseWriter.startElement("div", uiComponent);
                responseWriter.writeAttribute("class", TEXT_AREA_MAXLENGTH_COUNTER_CLASS, null);
                responseWriter.endElement("div");

                jsCall.append(", maxLength:").append(((HtmlTextArea) uiComponent).getMaxLength().intValue());
            }


            jsCall.append("});");

            responseWriter.startElement("script", uiComponent);
            responseWriter.writeText(jsCall.toString(), null);
            responseWriter.endElement("script");
        }
    }
}