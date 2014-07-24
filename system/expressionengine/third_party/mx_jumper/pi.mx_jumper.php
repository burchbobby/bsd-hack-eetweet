<?php

/**
 *  MX Jumper Class for ExpressionEngine2
 *
 * @package		ExpressionEngine
 * @subpackage	Plugins
 * @category	Plugins
 * @author    Max Lazar <max@eec.ms>
 * @Commercial - please see LICENSE file included with this distribution
 */



$plugin_info = array(
    'pi_name' => 'MX Jumper',
    'pi_version' => '1.2.2',
    'pi_author' => 'Max Lazar',
    'pi_author_url' => 'http://eec.ms/',
    'pi_description' => 'MX Jumper allows you to move pieces of content from one spot in your template to another.',
    'pi_usage' => Mx_jumper::usage()
);




Class Mx_jumper
{
    var $return_data = "";
    var $var_name = "";
    var $cache = "";
    
    function Mx_jumper()
    {
        $this->EE =& get_instance();
        $this->var_name = $this->EE->TMPL->fetch_param('name');
		
		$this->cache =& $this->EE->session->cache[__CLASS__];
        
    }
    
    function put_group()
    {
        if (!isset($this->cache['group'][$this->var_name])) {
            $this->cache['group'][$this->var_name] = array();
        }
        
        $this->cache['group'][$this->var_name][] = $this->EE->TMPL->tagdata;
        
    }
    
    
    function put()
    {
        $this->cache['single'][$this->var_name] = $this->EE->TMPL->tagdata;
    }
    
    function prepend()
    {
        if (!isset($this->cache['single'][$this->var_name])) {
            $this->cache['single'][$this->var_name] = "";
        }
     
        $separator = $this->EE->TMPL->fetch_param('separator');
		
        $this->cache['single'][$this->var_name] = $this->EE->TMPL->tagdata . $separator . $this->cache['single'][$this->var_name];
    }
    
    function append()
    {
        if (!isset($this->cache['single'][$this->var_name])) {
            $this->cache['single'][$this->var_name] = "";
        }
       
        $separator = $this->EE->TMPL->fetch_param('separator');
		
        $this->cache['single'][$this->var_name] = $this->cache['single'][$this->var_name] .  $separator . $this->EE->TMPL->tagdata;
    }
    
    function out_group()
    {
        $tagdata = $this->EE->TMPL->tagdata;
        
        $out = "";

        if (isset($this->cache['group'][$this->var_name])) {
            foreach ($this->cache['group'][$this->var_name] as $item => $data) {
                $out .= str_replace('{item}', $data, $tagdata);
            }
        }
		
        return $out;
    }
    
    function out()
    {
		$out = (isset($this->cache['single'][$this->var_name])) ? $this->cache['single'][$this->var_name] : '';
        return $out;
	}
    
    function out_global()
    {
		$tagdata = $this->EE->TMPL->tagdata;

		if(isset($this->cache)) {
			$tagdata = $this->EE->TMPL->parse_variables_row($tagdata, $this->cache['single']);
		}

        return $tagdata;
    }	
	
    function delete()
    {
        if (isset($this->cache['group'][$this->var_name])) {
            unset($this->cache['group'][$this->var_name]);
        }
		
        if (isset($this->cache['single'][$this->var_name])) {
            unset($this->cache['single'][$this->var_name]);
        }       
    }
    
    // ----------------------------------------
    //  Plugin Usage
    // ----------------------------------------
    
    // This function describes how the plugin is used.
    //  Make sure and use output buffering
    
    function usage()
    {
        ob_start();
?>

Tags:

Single variables:

Put single piece of content:
{exp:mx_jumper:put name=“city”}City{/exp:mx_jumper:put}

Insert content, specified by the tags, to the end of existing variable:
{exp:mx_jumper:append name=“city”}Lights{/exp:mx_jumper:append}

Insert content, specified by the parameter, to the beginning of existing variable:
{exp:mx_jumper:prepend name=“city”}Big{/exp:mx_jumper:prepend}

Out single piece of content:
{exp:mx_jumper:out name=“city”}

Global out of single variables:
{exp:mx_jumper:out_global}
{city}
....
{city_2}
{/exp:mx_jumper:out_global} 

Groups:
Put piece of content to group:
{exp:mx_jumper:put_group name=“my_group”}Toronto{/exp:mx_jumper:put_group}

Out the group of content:
{exp:mx_jumper:out_group name=“my_group”}{item}{/exp:mx_jumper:out_group}


<?php
        $buffer = ob_get_contents();
        
        ob_end_clean();
        
        return $buffer;
    }
    /* END */
    
}

/* End of file pi.mx_jumper.php */
/* Location: ./system/expressionengine/third_party/mx_jumper/pi.mx_jumper.php */